import React, { useState } from "react";

export default function Question({ question, selected, onSelect }) {
  const [answered, setAnswered] = useState(false);

  const handleOptionClick = (idx) => {
    if (answered) return; // prevent changing after selection
    onSelect(question.id, idx);
    setAnswered(true);
  };

  return (
    <div className="question">
      <div className="question-text">
        {question.id}. {question.q}
      </div>
      {question.options.map((opt, idx) => {
        let className = "option";
        if (answered) {
          if (idx === question.answer) className += " correct";
          else if (idx === selected && idx !== question.answer)
            className += " wrong";
          className += " disabled";
        }

        return (
          <div
            key={idx}
            className={className}
            onClick={() => handleOptionClick(idx)}
          >
            <input
              type="radio"
              name={`q${question.id}`}
              value={idx}
              checked={selected === idx}
              readOnly
            />
            <label>{opt}</label>
          </div>
        );
      })}
    </div>
  );
}
