import { useRef } from "react";
export default function Answers({selectedAnswer, answers, answerState, onSelect}){
    const shuffledAnswers = useRef();

    if(!shuffledAnswers.current){
        shuffledAnswers.current = [...answers]
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {answers.map((ans) => {
                const isSelected = ans === selectedAnswer;
                let cssClass = '';
                if(answerState === 'answered' && isSelected){
                    cssClass = 'selected';
                }
                if((answerState === 'correct' || answerState === 'wrong') && isSelected){
                    cssClass = answerState;
                }
                return <li className="answer" key={ans}>
                    <button onClick={() => {onSelect(ans)}} className={cssClass}>{ans}</button>
                </li>
            })}
        </ul>
    )
}