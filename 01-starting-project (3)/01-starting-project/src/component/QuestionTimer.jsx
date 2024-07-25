import { useEffect, useState } from "react";
export default function QuestionTimer({timer, onTimeout}){
    const [remainingTime, setRemainingTime] = useState(timer)

    useEffect(() => {
        setTimeout(onTimeout , timer);
    }, [onTimeout, timer])

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(remainingTime - 100);
        }, 100)

        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <progress id="questions" max={timer} value={remainingTime} />
    )
}