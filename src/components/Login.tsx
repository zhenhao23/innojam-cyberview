import { useNavigate } from "react-router-dom";
import "./Login.css";
import digitalIdIcon from "../assets/digitalid.svg";

const Login = () => {
  const navigate = useNavigate();

  const handleDigitalIdLogin = () => {
    // Simulate Digital ID authentication
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="cyber-grid"></div>
        <div className="floating-elements">
          <div className="element element-1">🏢</div>
          <div className="element element-2">🗺️</div>
          <div className="element element-3">🛰️</div>
          <div className="element element-4">💬</div>
          <div className="element element-5">📍</div>
        </div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="app-logo">
            <h1 className="app-title">SmartCyber</h1>
          </div>
          <p className="app-subtitle">Your voices, our data. A smarter Cyberjaya.</p>
        </div>

        <div className="login-form">

          <button
            type="button"
            className="social-btn digital-id-btn"
            onClick={handleDigitalIdLogin}
          >
            Continue with <img src={digitalIdIcon} alt="Digital ID" className="social-icon digital-id-icon" width={80} />
          </button>
        </div>

        <div className="login-footer">
          {/* <p>
            Don't have an account?{" "}
            <a href="#" className="signup-link">
              Sign up here
            </a>
          </p> */}
          <p className="version-info">
            Version 1.0.0 • Built by TBC(The Best in Cyberjaya)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;