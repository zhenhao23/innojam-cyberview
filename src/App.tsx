import "./App.css";
import GoogleMap from "./components/GoogleMap";

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
          <h2>Google Maps API Key Missing</h2>
          <p>Please add your Google Maps API key to the .env file:</p>
          <code
            style={{
              background: "#f5f5f5",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
          </code>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <GoogleMap
        apiKey={apiKey}
        center="2.9088274775234573, 101.65702556817263"
        zoom={19}
        mapId="DEMO_MAP_ID"
      />
    </div>
  );
}

export default App;
