import { useState } from "react"
import QUESTIONS from '../../questions'

export default function Quiz(){
    const[userAnswer, setUserAnswer] = useState([]);
    const activeQuestionIndex = userAnswer.length;

    function handleSelectedAnswer(selectedAnswer){
        setUserAnswer((prevAnswers) => {
            return [
                ...prevAnswers,
                selectedAnswer
            ]
        })
    }

    return (
       <div id="quiz">
             <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {QUESTIONS[activeQuestionIndex].answers.map((ans) =><li className="answer" key={ans}><button onClick={() => {
                        handleSelectedAnswer(ans);
                    }}>{ans}</button></li>)}
                </ul>
             </div>
       </div>
    )
}