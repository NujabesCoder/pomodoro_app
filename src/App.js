import React, { useState, useEffect, useRef } from 'react';
import logo from './lemon_of_strength.png';
import lockInImage from './lock_in_Lemon.png';
import {WORK_TIME, BREAK_TIME} from './constants';
import breakSoundFinished from './break_finished.wav'
import sessionSoundFinished from './session_finished.wav'
import './App.css';


function App() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [finishedMessage, setFinishedMessage] = useState("");
  const [alarmPlayed, setAlarmPlayed] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    let timer = null;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
     if(!alarmPlayed) {
      if(!onBreak) {
        audioRef.current = new Audio(sessionSoundFinished);
        audioRef.current.play();
        setFinishedMessage("Good job :) go take a break !");
        setAlarmPlayed(true);
      } else {
        audioRef.current = new Audio(breakSoundFinished);
        audioRef.current.play();
        setFinishedMessage("Break is Finished ! LOCK IN LOCK IN LOCK IN");
        setAlarmPlayed(true);
      }
     }
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onBreak, alarmPlayed]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Event handlers for the buttons
  const handleStart = () => {
    // stop the current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setAlarmPlayed(false);
    setOnBreak(false);
    setTimeLeft(WORK_TIME);
    setIsRunning(true);
    setFinishedMessage("");
  };

  /*const handleStop = () => {
    setIsRunning(prev => !prev);
  };*/

  const handleBreak = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setAlarmPlayed(false);
    setOnBreak(true);
    setTimeLeft(BREAK_TIME);
    setIsRunning(true);
    setFinishedMessage("");
  };

  return (
    <div className="App">
      <h1 className="title">
        Pomodoro timer
      </h1>
      <h1 className="small-title">
        to help you stay focused :)
      </h1>
      <img src={logo} className="App-logo" alt="logo" />
      

      <header className="App-header">


        <div className="timer-display">
          {formatTime(timeLeft)}
        </div>

                
        {finishedMessage && (
          <div className="finished-message">
            {finishedMessage}
          </div>
        )}

        <div className="buttons-container">

          <button 
            className="timers start-btn" 
            title="let's go ! you can do it ! stay focused" 
            onClick={handleStart}>
              start
          </button>

          {/*<button 
            className="timers stop-btn"  
            title="it's okay to take a lil break, come back stronger"
            onClick={handleStop}>
              stop
          </button>*/}

          <button 
            className="timers break-btn" 
            title="congratulation, you deserve it :)" 
            onClick={handleBreak}>
              break
          </button>

        </div>
        <p className="text">
          Click on "Start" if you want to start the timer. It's a 25 min session with a 5 min break. Once your 
          start it, you cannot pause it. 
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
