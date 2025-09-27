import React, { useState } from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { sections } from "./data/questions";

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleAnswer = (questionId, answerIdx) => {
    setAnswers({ ...answers, [questionId]: answerIdx });
  };

  return (
    <div className="container">
      <h1 className="quiz-title">English Quiz</h1>
      {!showResult ? (
        <Quiz
          section={sections[currentSection]}
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleNextSection}
        />
      ) : (
        <Result answers={answers} sections={sections} />
      )}
    </div>
  );
}
