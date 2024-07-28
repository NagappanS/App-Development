import React, { useEffect, useState } from 'react';

export default function Stop() {
  const [time, setTime] = useState(0);
  const [run, setRun] = useState(false);

  useEffect(() => {
    let interval = null;
    if (run) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [run]);

  const handleRun = () => {
    setRun(!run);
  };

  const handleReset = () => {
    setTime(0);
    setRun(false);
  };

  return (
    <div className='head'>
      <h1>Stop Watch</h1>
      <div className='sub1'>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className='sub2'>
        <button onClick={handleRun}>
          {run ? "Stop" : "Start"}
        </button>
      </div>
      <div className='sub3'>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
