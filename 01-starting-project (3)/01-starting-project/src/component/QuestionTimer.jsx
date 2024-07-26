import { useEffect, useState } from "react";
export default function QuestionTimer({onTimeout, timeout}){
    const [remainingTime, setRemainingTime] = useState(timeout);
   
    useEffect(() => {
        const quizTimer = setTimeout(onTimeout , timeout);
        return () => {
            clearTimeout(quizTimer);
        }
    }, [timeout, onTimeout]) 

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 100)
        }, 100)
        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <progress id="questions" max={timeout} value={remainingTime}/>
    )
}