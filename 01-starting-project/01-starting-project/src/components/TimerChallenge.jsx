import { useState, useRef } from 'react';



export default function TimerChallenge({title, targetTime}){
    const [timerExpired, setTimerExpired] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    let timerStop = useRef();

    function handleStart(){
        timerStop.current = setTimeout(() => {
            setTimerExpired(true);
        }, 1000 * targetTime);

        setTimerStarted(true);
    }

    function handleStop() {
        clearTimeout(timerStop.current)
    }

    return (
        <section className="challenge"> 
            <h2>{title}</h2>
            {timerExpired && <p>You Lost!</p>}
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerStarted ? handleStop : handleStart} >
                    {timerStarted ? 'stop' : 'start'} Challenge
                </button>
            </p>
            <p className={timerStarted}>
                Time is running / inactive
            </p>                                                                                                  
        </section>
    )
}