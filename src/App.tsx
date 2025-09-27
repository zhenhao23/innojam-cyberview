import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoogleMap from "./components/GoogleMap";
import LocationRouter from "./components/LocationRouter";
import SuggestionSummary from "./components/SuggestionSummary";
import Dify from "./components/Dify";
import { ChatProvider } from "./contexts/ChatContext";
import DifyBusiness from "./components/DifyBusiness";
import Login from "./components/Login";
import Report from "./components/Report";
import ReportDetail from "./components/ReportDetail";
import Hots from "./components/Hots";



function App() {
  // Get API key from environment variables
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Error handling for missing API key
  if (!apiKey) {
    return (
      <div className="App">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h2 style={{ color: "#ff6b6b" }}>⚠️ Missing Google Maps API Key</h2>
          <p style={{ textAlign: "center", maxWidth: "600px" }}>
            Please add your Google Maps API key to the <code>.env</code> file:
            <br />
            <code
              style={{
                background: "#f1f1f1",
                padding: "10px",
                borderRadius: "4px",
                display: "block",
                margin: "10px 0",
              }}
            >
              VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
            </code>
          </p>
          <p style={{ color: "#666", fontSize: "14px" }}>
            Get your API key from the{" "}
            <a
              href="https://console.cloud.google.com/google/maps-apis"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Cloud Console
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <ChatProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <GoogleMap
                  apiKey={apiKey}
                  center="2.9089783942489014, 101.65710017412017"
                  zoom={18}
                  mapId="DEMO_MAP_ID"
                />
              }
            />
            <Route path="/suggestion-summary" element={<SuggestionSummary />} />
            <Route path="/location/:locationId" element={<LocationRouter />} />
            <Route path="/dify" element={<Dify />} />
            <Route path="/ai-insights" element={<DifyBusiness />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/report/:reportId" element={<ReportDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Hots" element={<Hots />} />
          </Routes>
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;
