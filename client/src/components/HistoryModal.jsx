import React from "react";

const HistoryModal = ({ history, onClose, onSelectQuery }) => {
  const getModeIcon = (mode) => {
    switch (mode) {
      case 'groq': return '⚡';
      case 'gemini': return '✨';
      case 'both': return '🔄';
      default: return '📝';
    }
  };

  const getModeLabel = (mode) => {
    switch (mode) {
      case 'groq': return 'Groq';
      case 'gemini': return 'Gemini';
      case 'both': return 'Both';
      default: return mode;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content history-modal-content" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>📜 Query History</h2>
        <p className="history-subtitle">Your last 5 queries</p>

        <div className="history-list">
          {history.length === 0 ? (
            <div className="empty-history">
              <p>No query history yet</p>
              <small>Your queries will appear here after your first question</small>
            </div>
          ) : (
            history.map((query) => (
              <div
                key={query.id}
                className="history-item"
                onClick={() => onSelectQuery(query)}
              >
                <div className="history-item-header">
                  <span className="history-mode-badge">
                    {getModeIcon(query.mode)} {getModeLabel(query.mode)}
                  </span>
                  <span className="history-timestamp">
                    {new Date(query.created_at).toLocaleDateString()}{" "}
                    {new Date(query.created_at).toLocaleTimeString()}
                  </span>
                </div>

                <div className="history-prompt">
                  {query.prompt}
                </div>

                <div className="history-click-hint">
                  Click to view response
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default HistoryModal;
