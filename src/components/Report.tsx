import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Report.css";

interface ReportData {
  id: string;
  title: string;
  type: "development" | "infrastructure" | "community" | "business";
  status: "pending" | "in-progress" | "completed" | "rejected"| "ready to generate";
  priority: "low" | "medium" | "high" | "critical";
  location: string;
  submittedBy: string;
  submittedDate: string;
  description: string;
  tags: string[];
}

const Report = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [reportStates, setReportStates] = useState<{[key: string]: 'idle' | 'generating' | 'ready'}>({});
  const [countdowns, setCountdowns] = useState<{[key: string]: number}>({});

  // Mock business report data
const reportData: ReportData[] = [
    {
        id: "BRP-001",
        title: "New Chagee Store Planning in Cyberjaya",
        type: "business",
        status: "completed",
        priority: "high",
        location: "Cyberjaya",
        submittedBy: "Chagee Malaysia",
        submittedDate: "2025-09-27",
        description: "Establishment of a new Chagee bubble tea outlet in Cyberjaya. This popular Taiwanese bubble tea brand will bring authentic flavors and high-quality beverages to Cyberjaya residents and visitors. The store will feature modern interior design, extensive menu options, and will contribute to the mall's dining and beverage ecosystem. Expected to create local employment opportunities and attract more foot traffic to the shopping center.",
        tags: ["food-and-beverage", "retail", "franchise", "taiwanese", "bubble-tea", "chagee", "commercial"]
    }
];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "#28a745";
      case "in-progress": return "#007bff";
      case "pending": return "#ffc107";
      case "rejected": return "#dc3545";
      default: return "#6c757d";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "#dc3545";
      case "high": return "#fd7e14";
      case "medium": return "#ffc107";
      case "low": return "#28a745";
      default: return "#6c757d";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "development": return "🏗️";
      case "infrastructure": return "🛤️";
      case "community": return "👥";
      case "business": return "🏢";
      default: return "📄";
    }
  };

  const handleGenerateReport = (reportId: string) => {
    setReportStates(prev => ({ ...prev, [reportId]: 'generating' }));
    setCountdowns(prev => ({ ...prev, [reportId]: 20 }));
    
    // Start countdown
    const interval = setInterval(() => {
      setCountdowns(prev => {
        const newCount = (prev[reportId] || 20) - 1;
        if (newCount <= 0) {
          clearInterval(interval);
          setReportStates(prevStates => ({ ...prevStates, [reportId]: 'ready' }));
          return { ...prev, [reportId]: 0 };
        }
        return { ...prev, [reportId]: newCount };
      });
    }, 1000);
  };

  const handleViewReport = (reportId: string) => {
    navigate(`/report/${reportId}`);
  };

  const getButtonText = (reportId: string) => {
    const state = reportStates[reportId] || 'idle';
    const countdown = countdowns[reportId] || 0;
    
    switch (state) {
      case 'generating':
        return `⏳ Generating...`;
      case 'ready':
        return '📄 View Report';
      default:
        return '🔄 Generate Report';
    }
  };

  const getButtonHandler = (reportId: string) => {
    const state = reportStates[reportId] || 'idle';
    
    switch (state) {
      case 'ready':
        return () => handleViewReport(reportId);
      case 'generating':
        return undefined; // Disabled state
      default:
        return () => handleGenerateReport(reportId);
    }
  };

  const filteredReports = reportData.filter(report => {
    const matchesFilter = activeFilter === "all" || report.type === activeFilter || report.status === activeFilter;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: reportData.length,
    pending: reportData.filter(r => r.status === "pending").length,
    inProgress: reportData.filter(r => r.status === "in-progress").length,
    completed: reportData.filter(r => r.status === "completed").length,
    rejected: reportData.filter(r => r.status === "rejected").length
  };

  return (
    <div className="report-container">
      {/* Header */}
      <div className="report-header">
        <div className="header-content">
          <button 
            className="back-button"
            onClick={() => navigate("/")}
            title="Back to Map"
          >
            ← Back to Map
          </button>
          <div className="header-title">
            <h1>🏢 Business Reports</h1>
            <p>Track and manage Cyberjaya business development and commercial initiatives</p>
          </div>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="stats-dashboard">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Reports</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card in-progress">
          <div className="stat-number">{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card completed">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card rejected">
          <div className="stat-number">{stats.rejected}</div>
          <div className="stat-label">Rejected</div>
        </div>
      </div>

      {/* Controls */}
      <div className="report-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search reports, locations, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <button 
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Reports
          </button>
          <button 
            className={`filter-btn ${activeFilter === "development" ? "active" : ""}`}
            onClick={() => setActiveFilter("development")}
          >
            🏗️ Development
          </button>
          <button 
            className={`filter-btn ${activeFilter === "infrastructure" ? "active" : ""}`}
            onClick={() => setActiveFilter("infrastructure")}
          >
            🛤️ Infrastructure
          </button>
          <button 
            className={`filter-btn ${activeFilter === "community" ? "active" : ""}`}
            onClick={() => setActiveFilter("community")}
          >
            👥 Community
          </button>
          <button 
            className={`filter-btn ${activeFilter === "business" ? "active" : ""}`}
            onClick={() => setActiveFilter("business")}
          >
            🏢 Business
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="reports-list">
        {filteredReports.length === 0 ? (
          <div className="no-reports">
            <div className="no-reports-icon">🔍</div>
            <h3>No reports found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-header-info">
                <div className="report-id-type">
                  <span className="report-type-icon">{getTypeIcon(report.type)}</span>
                  <span className="report-id">{report.id}</span>
                </div>
                <div className="report-badges">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(report.status) }}
                  >
                    {report.status.replace("-", " ").toUpperCase()}
                  </span>
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(report.priority) }}
                  >
                    {report.priority.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="report-content">
                <h3 className="report-title">{report.title}</h3>
                <p className="report-description">{report.description}</p>
                
                <div className="report-meta">
                  <div className="meta-item">
                    <span className="meta-icon">📍</span>
                    <span>{report.location}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">👤</span>
                    <span>{report.submittedBy}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📅</span>
                    <span>{new Date(report.submittedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="report-tags">
                  {report.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="report-actions">
                <button 
                  className={`action-btn ${reportStates[report.id] === 'generating' ? 'generating-btn' : reportStates[report.id] === 'ready' ? 'ready-btn' : 'view-btn'}`}
                  onClick={getButtonHandler(report.id)}
                  disabled={reportStates[report.id] === 'generating'}
                >
                  {getButtonText(report.id)}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Report;