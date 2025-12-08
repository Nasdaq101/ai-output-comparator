import React from "react";
import { Link } from "react-router-dom";

const Header = ({
  user,
  darkMode,
  onToggleTheme,
  onLogout,
  onShowHistory,
  onShowProfile
}) => {
  return (
    <header className="header">
      <div className="header-content">
        
        <div className="header-text">
          {user && (
            <button onClick={onShowHistory} className="auth-btn history-btn-left">
              📜 History
            </button>
          )}

          <div className="header-title">
            <h1>United Chats of America 🇺🇸</h1>
            <p>Compare responses from different AI models</p>
          </div>
        </div>

        <div className="header-auth">
          <button onClick={onToggleTheme} className="auth-btn theme-btn">
            {darkMode ? '☀️' : '🌙'}
          </button>

          <Link to="/about" className="auth-btn login-btn">About</Link>

          {user ? (
            <div className="user-menu">
              <span className="user-name">👤 {user.username}</span>
              <button onClick={onShowProfile} className="auth-btn profile-btn">
                Profile
              </button>
              <button onClick={onLogout} className="auth-btn logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="auth-btn login-btn">Sign In</Link>
              <Link to="/signup" className="auth-btn signup-btn">Sign Up</Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
