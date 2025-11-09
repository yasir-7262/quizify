import React, { useState, useEffect } from "react";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // ✅ Load audio
  const correctSound = new Audio("/sounds/correct.wav");
  const wrongSound = new Audio("/sounds/wrong.wav");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
      );
      const data = await res.json();
      const formatted = data.results.map((q) => ({
        question: q.question,
        correct: q.correct_answer,
        options: shuffle([...q.incorrect_answers, q.correct_answer]),
      }));
      setQuestions(formatted);
      setAnswers(formatted[0].options);
    };
    fetchData();
  }, []);

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  const handleAnswer = (ans) => {
    setSelected(ans);
    if (ans === questions[currentQ].correct) {
      setScore(score + 1);
      correctSound.play();
    } else {
      wrongSound.play();
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setAnswers(questions[currentQ + 1].options);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const progressPercent = questions.length
    ? ((currentQ + (selected ? 1 : 0)) / questions.length) * 100
    : 0;

  if (questions.length === 0)
    return (
      <p className="text-center text-lg mt-10 text-gray-300 animate-pulse">
        Loading questions...
      </p>
    );

  if (showResult)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4 text-center">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Quiz Completed 🎉
          </h1>
          <p className="text-lg sm:text-xl mb-3">
            Your Score:{" "}
            <span className="font-semibold text-green-400">{score}</span> /{" "}
            {questions.length} (
            {Math.round((score / questions.length) * 100)}%)
          </p>
          <p className="text-base sm:text-lg mb-6 text-gray-300">
            {score === questions.length
              ? "Perfect! 🔥"
              : score >= questions.length / 2
              ? "Good job! 👍"
              : "Keep practicing 💪"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all"
          >
            Restart Quiz
          </button>
        </div>
        <footer className="bg-gray-800 text-gray-400 text-center py-4 mt-8 w-full">
          <p className="text-sm sm:text-base">
            &copy; {new Date().getFullYear()} Quiz Project. Made with ❤️ by Jatt
          </p>
        </footer>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4 py-8">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
        <div
          className="bg-green-500 h-4 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Quiz Container */}
      <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl">
        <h2
          className="text-lg sm:text-xl md:text-2xl font-bold mb-6 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: questions[currentQ].question }}
        />
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {answers.map((ans, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(ans)}
              className={`p-3 sm:p-4 rounded-lg text-sm sm:text-base transition-all duration-300 text-white font-medium ${
                selected
                  ? ans === questions[currentQ].correct
                    ? "bg-green-600"
                    : ans === selected
                    ? "bg-red-600"
                    : "bg-blue-700 opacity-60"
                  : "bg-blue-700 hover:bg-blue-500"
              }`}
              dangerouslySetInnerHTML={{ __html: ans }}
              disabled={selected !== null}
            />
          ))}
        </div>
        {selected && (
          <button
            onClick={nextQuestion}
            className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all"
          >
            {currentQ + 1 === questions.length ? "Finish Quiz" : "Next"}
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-4 mt-8 w-full">
        <p className="text-sm sm:text-base">
          &copy; {new Date().getFullYear()} Quiz Project. Made with ❤️ by Yasir
        </p>
      </footer>
    </div>
  );
};

export default Questions;
