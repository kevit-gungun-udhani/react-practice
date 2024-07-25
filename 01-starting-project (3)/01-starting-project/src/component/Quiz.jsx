import { useState } from "react"
import QUESTIONS from '../../questions'
import quizComplete from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer'

export default function Quiz(){
    const[userAnswer, setUserAnswer] = useState([]);
    const activeQuestionIndex = userAnswer.length;

    const quizIsCompleted = QUESTIONS.length === activeQuestionIndex;

    function handleSelectedAnswer(selectedAnswer){
        setUserAnswer((prevAnswers) => {
            return [
                ...prevAnswers,
                selectedAnswer
            ]
        })
    }

    if(quizIsCompleted){
        return (
            <div id="summary">
                <img src={quizComplete} alt="A Trophy Icon"/>
                <h2>Quiz Completed</h2>
            </div>
        )
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
       <div id="quiz">
             <div id="question">
                <QuestionTimer timer={10000} onTimeout={() => {}} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((ans) =><li className="answer" key={ans}><button onClick={() => {
                        handleSelectedAnswer(ans);
                    }}>{ans}</button></li>)}
                </ul>
             </div>
       </div>
    )
}