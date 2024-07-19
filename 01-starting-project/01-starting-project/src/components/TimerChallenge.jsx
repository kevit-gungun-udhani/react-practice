import {useState} from 'react';

export default function TimerChallenge({title, targetTime}){
    const [timerExpired, setTimerExpired] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);

    function handleStart(){
        setTimeout(() => {
            setTimerExpired(true);
        }, 1000 * targetTime);

        setTimerStarted(true);
    }

    return (
        <section className="challenge"> 
            <h2>{title}</h2>
            {timerExpired && <p>You Lost!</p>}
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={handleStart} >
                    {timerStarted ? 'stop' : 'start'} Challenge
                </button>
            </p>
            <p className={timerStarted}>
                Time is running / inactive
            </p>                                                                                                  
        </section>
    )
}