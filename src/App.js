import React, { useState, useEffect } from 'react';
import logo from './lemon_of_strength.png';
import lockInImage from './lock_in_Lemon.png';
import {WORK_TIME, BREAK_TIME} from './constants';
import './App.css';


function App() {
  const [time, setTime] = useState(0);



  return (
    <div className="App">
      <h1 className="title">
        Pomodoro timer
      </h1>
      <img src={logo} className="App-logo" alt="logo" />
      <header className="App-header">


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
