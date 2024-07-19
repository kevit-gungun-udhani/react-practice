import {useState} from 'react'
import {useRef} from 'react';

export default function Player() {
  const input = useRef();

  const[userName, setUserName] = useState(null);
  

  function handleClick(){
    setUserName(input.current.value);
    input.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {userName ?? 'Unknown Entity'} </h2>
      <p>
        <input ref={input} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
