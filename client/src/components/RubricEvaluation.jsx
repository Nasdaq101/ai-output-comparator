import React from "react";

const RubricEvaluation = ({ evaluation }) => {
  if (!evaluation || !evaluation.rubric) return null;

  const { rubric, evaluator } = evaluation;
  const { response_a, response_b, overall_comparison, recommendation } = rubric;

  return (
    <div className="rubric-section">
      <div className="rubric-header">
        <h2>📊 AI Evaluation Results</h2>
        <span className="evaluator-badge">Evaluated by: {evaluator}</span>
      </div>

      <div className="rubric-content">
        <div className="rubric-scores">
          
          <div className="rubric-card groq-rubric">
            <h3>⚡ Groq (Llama 3.3)</h3>
            <div className="total-score">
              Total Score: <span className="score-value">{response_a.total}/50</span>
            </div>

            <div className="criteria-scores">
              <div className="criteria-item"><span>Accuracy</span><span>{response_a.accuracy}/10</span></div>
              <div className="criteria-item"><span>Relevance</span><span>{response_a.relevance}/10</span></div>
              <div className="criteria-item"><span>Clarity</span><span>{response_a.clarity}/10</span></div>
              <div className="criteria-item"><span>Completeness</span><span>{response_a.completeness}/10</span></div>
              <div className="criteria-item"><span>Usefulness</span><span>{response_a.usefulness}/10</span></div>
            </div>

            <div className="strengths-weaknesses">
              <div className="strengths">
                <h4>✅ Strengths</h4>
                <ul>
                  {response_a.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div className="weaknesses">
                <h4>⚠️ Weaknesses</h4>
                <ul>
                  {response_a.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            </div>
          </div>

          <div className="rubric-card gemini-rubric">
            <h3>✨ Gemini</h3>
            <div className="total-score">
              Total Score: <span className="score-value">{response_b.total}/50</span>
            </div>

            <div className="criteria-scores">
              <div className="criteria-item"><span>Accuracy</span><span>{response_b.accuracy}/10</span></div>
              <div className="criteria-item"><span>Relevance</span><span>{response_b.relevance}/10</span></div>
              <div className="criteria-item"><span>Clarity</span><span>{response_b.clarity}/10</span></div>
              <div className="criteria-item"><span>Completeness</span><span>{response_b.completeness}/10</span></div>
              <div className="criteria-item"><span>Usefulness</span><span>{response_b.usefulness}/10</span></div>
            </div>

            <div className="strengths-weaknesses">
              <div className="strengths">
                <h4>✅ Strengths</h4>
                <ul>
                  {response_b.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div className="weaknesses">
                <h4>⚠️ Weaknesses</h4>
                <ul>
                  {response_b.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            </div>
          </div>

        </div>

        <div className="rubric-summary">
          <div className="summary-section">
            <h3>🔍 Overall Comparison</h3>
            <p>{overall_comparison}</p>
          </div>
          <div className="summary-section recommendation">
            <h3>💡 Recommendation</h3>
            <p>{recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RubricEvaluation;
