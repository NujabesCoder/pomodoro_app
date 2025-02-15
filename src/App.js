import React, { useState, useEffect } from 'react';
import logo from './lemon_of_strength.png';
import lockInImage from './lock_in_Lemon.png';
import {WORK_TIME, BREAK_TIME} from './constants';
import './App.css';


function App() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  useEffect(() => {
    let timer = null;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      if (!onBreak) {
        setTimeLeft(BREAK_TIME);
        setOnBreak(true);
      } else {
        setTimeLeft(WORK_TIME);
        setOnBreak(false);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onBreak]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Event handlers for the buttons
  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleBreak = () => {
    // Force break mode: set timer to break time and start it.
    setIsRunning(true);
    setOnBreak(true);
    setTimeLeft(BREAK_TIME);
  };

  return (
    <div className="App">
      <h1 className="title">
        Pomodoro timer
      </h1>
      <img src={logo} className="App-logo" alt="logo" />

      <header className="App-header">

        <div className="timer-display">
          {formatTime(timeLeft)}
        </div>

        <div className="buttons-container">

          <button 
            className="timers start-btn" 
            title="let's go ! you can do it ! stay focused" 
            onClick={handleStart}>
              start
          </button>

          <button 
            className="timers stop-btn"  
            title="it's okay to take a lil break, come back stronger"
            onClick={handleStop}>
              stop
          </button>

          <button 
            className="timers break-btn" 
            title="congradulationsà, you deserve it :)" 
            onClick={handleBreak}>
              break
          </button>

        </div>
        <p>
          Click on the timer if you want to start it. It's a 25 min session with a 5 min break
        </p>

        <a
           className="App-link"
           href={lockInImage}
           target="_blank"
           rel="noopener noreferrer"
        >
          <span>don't click here</span>
        </a>


      </header>
    </div>
  );
}

export default App;
