import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Report.css";

interface ReportData {
  id: string;
  title: string;
  type: "development" | "infrastructure" | "community" | "business";
  status: "pending" | "in-progress" | "completed" | "rejected";
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

  // Mock report data
  const reportData: ReportData[] = [
    {
      id: "RPT-001",
      title: "Basketball Court Development Proposal",
      type: "development",
      status: "in-progress",
      priority: "high",
      location: "Site A - Cyberjaya Central",
      submittedBy: "Community Sports Committee",
      submittedDate: "2025-09-25",
      description: "Proposal to develop a modern basketball court with LED lighting and proper drainage system.",
      tags: ["sports", "recreation", "youth", "community"]
    },
    {
      id: "RPT-002",
      title: "Swimming Pool Complex Planning",
      type: "development",
      status: "pending",
      priority: "medium",
      location: "Site B - Near DPULZE",
      submittedBy: "Cyberjaya Residents Association",
      submittedDate: "2025-09-24",
      description: "Community-requested swimming pool complex with Olympic-size pool and children's area.",
      tags: ["sports", "swimming", "family", "health"]
    },
    {
      id: "RPT-003",
      title: "Smart Traffic Light System",
      type: "infrastructure",
      status: "completed",
      priority: "critical",
      location: "Persiaran Apec Intersection",
      submittedBy: "Transportation Authority",
      submittedDate: "2025-09-20",
      description: "Implementation of AI-powered traffic management system to reduce congestion.",
      tags: ["traffic", "ai", "smart-city", "efficiency"]
    },
    {
      id: "RPT-004",
      title: "Community Garden Initiative",
      type: "community",
      status: "in-progress",
      priority: "low",
      location: "Empty Land Site C",
      submittedBy: "Green Cyberjaya Movement",
      submittedDate: "2025-09-22",
      description: "Urban farming project to promote sustainability and community bonding.",
      tags: ["sustainability", "farming", "environment", "community"]
    },
    {
      id: "RPT-005",
      title: "Tech Startup Hub Development",
      type: "business",
      status: "pending",
      priority: "high",
      location: "Near IOI City Mall",
      submittedDate: "2025-09-26",
      submittedBy: "Cyberjaya Business Council",
      description: "Co-working space and incubator for technology startups and entrepreneurs.",
      tags: ["business", "technology", "startups", "innovation"]
    },
    {
      id: "RPT-006",
      title: "Parking Infrastructure Upgrade",
      type: "infrastructure",
      status: "rejected",
      priority: "medium",
      location: "Tamarind Square",
      submittedBy: "Mall Management",
      submittedDate: "2025-09-18",
      description: "Additional parking levels and smart parking system implementation.",
      tags: ["parking", "infrastructure", "convenience"]
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
            <h1>📊 Development Reports</h1>
            <p>Track and manage Cyberjaya development projects and initiatives</p>
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
                <button className="action-btn view-btn">
                  👁️ View Details
                </button>
                <button className="action-btn edit-btn">
                  ✏️ Edit
                </button>
                <button className="action-btn export-btn">
                  📤 Export
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Action Button */}
      <button className="fab" title="Create New Report">
        ➕
      </button>
    </div>
  );
};

export default Report;