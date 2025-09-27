import { useParams, useNavigate } from "react-router-dom";
import "./Report.css";

interface ReportData {
  id: string;
  title: string;
  type: "development" | "infrastructure" | "community" | "business";
  status: "pending" | "in-progress" | "completed" | "rejected" | "ready to generate";
  priority: "low" | "medium" | "high" | "critical";
  location: string;
  submittedBy: string;
  submittedDate: string;
  description: string;
  tags: string[];
}

const ReportDetail = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();

  // Mock business report data (same as in Report component)
  const reportData: ReportData[] = [
    {
      id: "BRP-001",
      title: "Chagee Bubble Tea Store Opening",
      type: "business",
      status: "completed",
      priority: "high",
      location: "DPULZE Shopping Centre, Cyberjaya",
      submittedBy: "DPULZE Management & Chagee Malaysia",
      submittedDate: "2025-09-27",
      description: "Establishment of a new Chagee bubble tea outlet in DPULZE Shopping Centre. This popular Taiwanese bubble tea brand will bring authentic flavors and high-quality beverages to Cyberjaya residents and visitors. The store will feature modern interior design, extensive menu options, and will contribute to the mall's dining and beverage ecosystem. Expected to create local employment opportunities and attract more foot traffic to the shopping center.",
      tags: ["food-beverage", "retail", "franchise", "taiwanese", "bubble-tea", "chagee", "commercial"]
    }
  ];

  const report = reportData.find(r => r.id === reportId);

  if (!report) {
    return (
      <div className="report-container">
        <div className="report-header">
          <div className="header-content">
            <button 
              className="back-button"
              onClick={() => navigate("/reports")}
              title="Back to Reports"
            >
              ← Back to Reports
            </button>
            <h1>Report Not Found</h1>
          </div>
        </div>
        <div className="no-reports">
          <div className="no-reports-icon">🔍</div>
          <h3>Report not found</h3>
          <p>The requested report could not be found.</p>
        </div>
      </div>
    );
  }

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

  // Generate detailed report content
  const generateDetailedReport = () => {
    return `
**BUSINESS DEVELOPMENT REPORT**
Report ID: ${report.id}
Generated on: ${new Date().toLocaleDateString()}

**EXECUTIVE SUMMARY**
${report.title}

**PROJECT OVERVIEW**
${report.description}

**LOCATION ANALYSIS**
Primary Location: ${report.location}
The strategic positioning of this business venture in ${report.location} offers significant advantages for both residents and the broader Cyberjaya ecosystem. The location provides excellent accessibility and visibility for the target demographic.

**STAKEHOLDER INFORMATION**
Project Lead: ${report.submittedBy}
Submission Date: ${new Date(report.submittedDate).toLocaleDateString()}
Current Status: ${report.status.toUpperCase()}
Priority Level: ${report.priority.toUpperCase()}

**BUSINESS IMPACT ASSESSMENT**
This ${report.type} initiative is expected to contribute positively to the local economy through:
- Job creation opportunities for local residents
- Increased foot traffic to surrounding businesses
- Enhanced commercial diversity in the area
- Improved quality of life for Cyberjaya community members

**MARKET ANALYSIS**
The introduction of ${report.title} addresses a growing demand in the ${report.location} area. Market research indicates strong potential for success given the demographics and consumer preferences of Cyberjaya residents and visitors.

**IMPLEMENTATION TIMELINE**
Based on current status and priority level, the project timeline includes:
- Planning Phase: Completed
- Approval Process: ${report.status === 'completed' ? 'Completed' : 'In Progress'}
- Construction/Setup: ${report.status === 'completed' ? 'Completed' : 'Pending'}
- Operational Launch: ${report.status === 'completed' ? 'Successfully Launched' : 'Scheduled'}

**COMMUNITY BENEFITS**
- Enhanced retail and dining options
- Economic growth through increased commercial activity
- Employment opportunities for local workforce
- Contribution to Cyberjaya's vision as a modern, integrated city

**CONCLUSION**
${report.title} represents a valuable addition to the ${report.location} commercial landscape. The project aligns with Cyberjaya's development goals and is expected to deliver positive outcomes for all stakeholders involved.

**TAGS & CATEGORIES**
${report.tags.join(', ')}

---
Report generated by CyberView Business Intelligence System
For inquiries, please contact the relevant authorities or project stakeholders.
    `;
  };

  return (
    <div className="report-container">
      {/* Header */}
      <div className="report-header">
        <div className="header-content">
          <button 
            className="back-button"
            onClick={() => navigate("/reports")}
            title="Back to Reports"
          >
            ← Back to Reports
          </button>
          <div className="header-title">
            <h1>{getTypeIcon(report.type)} {report.title}</h1>
            <p>Detailed Business Development Report</p>
          </div>
        </div>
      </div>

      {/* Report Info */}
      <div className="report-detail-card">
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
      </div>

      {/* Detailed Report Content */}
      <div className="report-detail-content">
        <div className="report-text">
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
            {generateDetailedReport()}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;