import React from "react";
import { useNavigate } from 'react-router-dom';

export default function About() {
    const navigate = useNavigate();
return (

<div className="about-container">
    <button onClick={() => navigate('/')} className="back-btn">← Back</button>
<h1 className="about-title">About This Application</h1>


<p className="about-text">
This platform allows users to prompt <strong>multiple LLMs (Large Language Models)</strong> at once
and compare their responses side-by-side.
</p>


<ul className="about-list">
<li>⚡ Compare outputs from Groq, Gemini, and more in real-time.</li>
<li>🧠 Run advanced AI-powered <strong>rubric comparisons</strong> to evaluate accuracy, clarity, and usefulness.</li>
<li>🌗 Choose between <strong>dark and light themes</strong> for a better experience.</li>
<li>📱 Fully <strong>mobile-responsive</strong> design for all screen sizes.</li>
<li>🔐 Users can <strong>sign up / log in</strong> to view and load their past queries.</li>
<li>📊 Visual and structured representation of AI scores and comparisons.</li>
</ul>


<p className="about-text">
This project was built to make AI model comparison intuitive, educational, and powerful — useful for
developers, researchers, students, and anyone curious about the differences between LLMs.
</p>
</div>
);
}