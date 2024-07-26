import { useState, useCallback } from "react"
import QUESTIONS from '../../questions'
import quizComplete from '../assets/quiz-complete.png'
import Questions from "./Questions"

export default function Quiz(){
    const[ answerState, setAnswerState] = useState('');
    const[userAnswer, setUserAnswer] = useState([]);
    const activeQuestionIndex = answerState === '' ? userAnswer.length : userAnswer.length - 1;
    const quizIsCompleted = QUESTIONS.length === activeQuestionIndex;
    

    const handleSelectedAnswer = useCallback(function handleSelectedAnswer(selectedAnswer){
        setAnswerState('answered');
        setUserAnswer((prevAnswers) => {
            return [
                ...prevAnswers,
                selectedAnswer
            ]
        })

        setTimeout( () => {
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
                setAnswerState('correct')
            }else {
                setAnswerState('wrong')
            }

            setTimeout( () => {
                setAnswerState(''); 
            } ,2000)

        } ,1000)
    }, [activeQuestionIndex])

    const handleSkipAnswer = useCallback(() => {
        handleSelectedAnswer(null)
     }, [handleSelectedAnswer])

    if(quizIsCompleted){
        return (
            <div id="summary">
                <img src={quizComplete} alt="A Trophy Icon"/>
                <h2>Quiz Completed</h2>
            </div>
        )
    }

    
    return (
        <div id="quiz">
            <Questions 
                key={activeQuestionIndex}
                onSkipAnswer={handleSkipAnswer} 
                answerState={answerState}
                onSelectAnswer={handleSelectedAnswer}
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                selectedAnswer={userAnswer[userAnswer.length - 1]}
            />
        </div>
    )
}