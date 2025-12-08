import React from "react";

const ResponseCard = ({ name, badge, icon, color, data, loading }) => (
  <div className="response-card">
    <div className={`card-header ${color}-header`}>
      <h2>{icon} {name}</h2>
      <span className="badge">{badge}</span>
    </div>
    <div className="card-body">
      {loading && !data && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Getting response from {name}...</p>
        </div>
      )}
      {data && (
        <div className="response-content">
          {data.error ? (
            <div className="error-message">
              <p>⚠️ {data.response}</p>
              <small>{data.error}</small>
            </div>
          ) : (
            <>
              <p>{data.response}</p>
              {data.timestamp && (
                <div className="timestamp">
                  {new Date(data.timestamp).toLocaleString()}
                </div>
              )}
            </>
          )}
        </div>
      )}
      {!loading && !data && (
        <div className="empty-state">
          <p>No response yet. Enter a question and click "Compare AI Responses"</p>
        </div>
      )}
    </div>
  </div>
);

export default ResponseCard;
