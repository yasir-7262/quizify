import React, { useState } from "react";
import QuizSettings from "./QuizSetting";
import Questions from "./QuestionCard/Questions";

const QuizCard = () => {
  const [settings, setSettings] = useState(null);

  const startQuiz = (selectedSettings) => {
    setSettings(selectedSettings);
  };

  return (
    
    <>
<h1
  className="text-3xl sm:text-4xl md:text-5xl mb-10 z-1 font-extrabold text-transparent bg-clip-text bg-linear-to-r from-green-400 to-blue-500 drop-shadow-lg tracking-wide text-center"
  style={{ fontFamily: '"Bebas Neue", sans-serif' }}
>
  Quizify
</h1>


      {!settings ? (
        <QuizSettings startQuiz={startQuiz} />
      ) : (
        <Questions settings={settings} />
      )}
    </>
  );
};

export default QuizCard;
