import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoogleMap from "./components/GoogleMap";
import LocationDiscussion from "./components/LocationDiscussion";
import AddSuggestion from "./components/AddSuggestion";
import Dify from "./components/Dify";

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
          <Route path="/location/marker3" element={<AddSuggestion />} />
          <Route
            path="/location/:locationId"
            element={<LocationDiscussion />}
          />
          <Route path="/dify" element={<Dify />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
