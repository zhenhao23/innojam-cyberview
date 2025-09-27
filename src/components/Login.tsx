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
            <span className="logo-icon">🌐</span>
            <h1 className="app-title">CyberView</h1>
          </div>
          <p className="app-subtitle">Smart City Development Platform</p>
        </div>

        <div className="login-form">

          <button
            type="button"
            className="social-btn digital-id-btn"
            onClick={handleDigitalIdLogin}
          >
            <img src={digitalIdIcon} alt="Digital ID" className="social-icon" />
            Continue with Digital ID
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