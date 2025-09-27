import React from "react";

export default function Result({ answers, sections }) {
  const sectionScores = sections.map((section) => {
    const total = section.questions.length;
    const score = section.questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.answer ? 1 : 0);
    }, 0);
    return { title: section.title, score, total };
  });

  const totalScore = sectionScores.reduce((a, b) => a + b.score, 0);
  const totalQuestions = sectionScores.reduce((a, b) => a + b.total, 0);

  return (
    <div className="result-card">
      <h2 className="result-title">Quiz Results</h2>
      {sectionScores.map((s, idx) => (
        <p key={idx} className="result-section">
          {s.title}: {s.score} / {s.total}
        </p>
      ))}
      <p style={{ fontWeight: "bold", marginTop: "1rem" }}>
        Total Score: {totalScore} / {totalQuestions}
      </p>
    </div>
  );
}
