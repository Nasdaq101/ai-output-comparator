import React from "react";

const PromptForm = ({
  prompt,
  systemPrompt,
  compareMode,
  loading,
  onPromptChange,
  onSystemPromptChange,
  onCompareModeChange,
  onSubmit,
  onRubric,
  onClear
}) => {
  return (
    <form onSubmit={onSubmit} className="input-section">

      <div className="system-prompt-section">
        <label className="system-prompt-label">
          🤖 System Prompt (Optional)
          <span className="system-prompt-hint">Set custom instructions for the AI</span>
        </label>
        <textarea
          value={systemPrompt}
          onChange={(e) => onSystemPromptChange(e.target.value)}
          placeholder="e.g., 'You are a helpful coding assistant'"
          rows="2"
          disabled={loading}
          className="system-prompt-input"
        />
      </div>

      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Enter your question here"
        rows="4"
        disabled={loading}
        className="prompt-input"
      />

      <div className="mode-selector">
        <label className="mode-label">Select AI model:</label>
        <div className="mode-options">
          <button
            type="button"
            className={`mode-btn ${compareMode === 'both' ? 'active' : ''}`}
            onClick={() => onCompareModeChange('both')}
            disabled={loading}
          >
            🔄 Groq and Gemini
          </button>
          <button
            type="button"
            className={`mode-btn ${compareMode === 'groq' ? 'active' : ''}`}
            onClick={() => onCompareModeChange('groq')}
            disabled={loading}
          >
            ⚡ Only Groq
          </button>
          <button
            type="button"
            className={`mode-btn ${compareMode === 'gemini' ? 'active' : ''}`}
            onClick={() => onCompareModeChange('gemini')}
            disabled={loading}
          >
            ✨ Only Gemini
          </button>
        </div>
      </div>

      <div className="button-group">
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? '🔄 Loading...' : '✨ Get AI Response'}
        </button>
        <button
          type="button"
          onClick={onRubric}
          disabled={loading || compareMode !== 'both'}
          className="rubric-btn"
          title={compareMode !== 'both' ? 'Rubric requires Both mode' : 'Compare with rubric'}
        >
          {loading ? '🔄 Loading...' : '📊 Compare with Rubric'}
        </button>
        <button type="button" onClick={onClear} disabled={loading} className="clear-btn">
          🗑️ Clear
        </button>
      </div>
    </form>
  );
};

export default PromptForm;
