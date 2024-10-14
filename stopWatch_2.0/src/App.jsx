import { useEffect, useRef, useState } from "react";
import "./App.css";
const App = () => {
  const [time, setTime] = useState({
    hour: "00",
    minute: "00",
    second: "00",
  });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const handleStart = () => {
    setIsRunning(!isRunning);
  };
  console.log(time);

  /* const hancdleChange = (e, type) => {
    const value = parseInt(e.target.value);
    const cpyTime = { ...time };
    cpyTime[type] = value;
    setTime(cpyTime);
  }; */
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const cpyPrevTime = { ...prevTime };
          cpyPrevTime.second++;
          if (cpyPrevTime.second > 59) {
            cpyPrevTime.minute++;
            cpyPrevTime.second = 0;
          }
          if (cpyPrevTime.minute > 59) {
            cpyPrevTime.hour++;
            cpyPrevTime.minute = 0;
          }
          return cpyPrevTime;
        });
      }, 1000);
      return () => {
        clearInterval(intervalRef.current);
      };
    }
  }, [isRunning]);

  const handleReset = () => {
    const reset = { hour: "00", minute: "00", second: "00" };
    setTime(reset);
    setIsRunning(false);
  };

  return (
    <center>
      <h2>Stop Watch</h2>
      <div className="stop_watch">
        <span>{time.hour}:</span>
        <span>{time.minute}:</span>
        <span>{time.second}</span>

        <div className="btns">
          <button onClick={handleStart}>{isRunning ? "Pause" : "Start"}</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </center>
  );
};

export default App;
