import React, { useState, useEffect } from "react";
import Question from "./Question";

export default function Quiz({ section, answers, onAnswer, onNext }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [sectionProgress, setSectionProgress] = useState(0);

  // Calculate section progress whenever answers change
  useEffect(() => {
    const answeredInSection = section.questions.filter(
      (q) => answers[q.id] !== undefined
    ).length;
    setSectionProgress((answeredInSection / section.questions.length) * 100);
  }, [answers, section.questions]);

  const allAnswered = section.questions.every(
    (q) => answers[q.id] !== undefined
  );

  const handleSubmit = () => {
    if (!allAnswered) return;
    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);
      onNext();
    }, 1500);
  };

  return (
    <div className="card">
      <h2 className="section-title">{section.title}</h2>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${sectionProgress}%` }}
        ></div>
      </div>

      {section.questions.map((q) => (
        <Question
          key={q.id}
          question={q}
          selected={answers[q.id]}
          onSelect={onAnswer}
          showAnswer={showAnswer}
        />
      ))}

      <div style={{ textAlign: "right", marginTop: "1rem" }}>
        <button
          className={`btn btn-primary ${!allAnswered ? "btn-disabled" : ""}`}
          disabled={!allAnswered}
          onClick={handleSubmit}
        >
          {allAnswered ? "Submit Section" : "Answer all questions"}
        </button>
      </div>
    </div>
  );
}
