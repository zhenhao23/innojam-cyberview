const DifyBusiness = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <div style={{ 
        padding: "20px", 
        backgroundColor: "#f8f9fa", 
        borderBottom: "1px solid #dee2e6",
        textAlign: "center"
      }}>
        <h1 style={{ 
          margin: "0 0 10px 0", 
          color: "#2c3e50", 
          fontSize: "24px",
          fontWeight: "600"
        }}>
          🏢 Business Assistant
        </h1>
        <p style={{ 
          margin: 0, 
          color: "#6c757d", 
          fontSize: "14px" 
        }}>
          Get business insights and support for Cyberjaya development projects
        </p>
      </div>
      
      <div style={{ 
        width: "100%", 
        height: "calc(100vh - 100px)", 
        position: "relative" 
      }}>
        <iframe
          src="https://7qb3nlxs-80.asse.devtunnels.ms/chatbot/upkSXjF9h3UAO1z2"
          style={{ 
            width: "100%", 
            height: "100%", 
            border: "none",
            display: "block"
          }}
          frameBorder="0"
          allow="microphone"
          title="Business Assistant Chatbot"
        />
      </div>
      
      {/* Navigation back button */}
      <div style={{
        position: "fixed",
        top: "10px",
        left: "10px",
        zIndex: 1000
      }}>
        <button
          onClick={() => window.history.back()}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            fontSize: "20px",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0056b3";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#007bff";
            e.currentTarget.style.transform = "scale(1)";
          }}
          title="Go back"
        >
          ←
        </button>
      </div>
    </div>
  );
};

export default DifyBusiness;