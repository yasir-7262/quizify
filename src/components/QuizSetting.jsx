import React, { useState } from "react";

const QuizSettings = ({ startQuiz }) => {
  const [category, setCategory] = useState("18"); // default: Science
  const [difficulty, setDifficulty] = useState("medium");
  const [amount, setAmount] = useState(10);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Select Quiz Options</h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <label>
          Category:
          <select
            className="w-full p-2 rounded-lg bg-gray-800 text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="18">Science: Computers</option>
            <option value="9">General Knowledge</option>
            <option value="23">History</option>
            <option value="17">Science & Nature</option>
            {/* add more categories */}
          </select>
        </label>

        <label>
          Difficulty:
          <select
            className="w-full p-2 rounded-lg bg-gray-800 text-white"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label>
          Number of Questions:
          <input
            type="number"
            min="1"
            max="50"
            className="w-full p-2 rounded-lg bg-gray-800 text-white"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <button
          onClick={() => startQuiz({ category, difficulty, amount })}
          className="mt-4 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizSettings;
