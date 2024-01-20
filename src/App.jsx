// src/App.jsx
import { useRef } from "react";
import { useState } from "react";
import React from "react";
import "./App.css";
import './Countdown.css';

export default function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [count, setCount] = useState(0);
  const parentRef = useRef(null);
  const [counter, setCounter] = React.useState(30);
  const [counter1, setCounter1] = useState(3);



  // React.useEffect(() => {
  //   if (counter1 > 0) {
  //     const timer = setTimeout(() => {
  //       setCounter1(counter1 - 1);
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   }
    
  // }, [counter1]);

  // React.useEffect(() => {
  //   counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  // }, [counter]);

  
  React.useEffect(() => {
    // Check if the 3-second timer has finished
    if (counter1 > 0) {
      const timer = setTimeout(() => {
        setCounter1(counter1 - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // The 3-second timer has finished, start the 30-second timer
     counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter1, counter]);
  

  const handleClick = () => {
    if (counter > 0 && counter1 === 0){
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 10); // resets back after 0.5 seconds
    setCount((prev) => prev + 1);
  }else{
    setIsClicked(false);
  }

    // animate
    if (counter > 0 && counter1 === 0){
    const newDiv = document.createElement("div");
    newDiv.textContent = "IQ + 1";
    newDiv.classList.add("floatingText");
    parentRef.current.appendChild(newDiv);
    setTimeout(() => {
      newDiv.remove();
    }, 1000);
  }

  };

  return (
    
    <div className="parent-anchor" ref={parentRef}>
      {counter1 > 0 && <div className={`countdown countdown-${counter1}`}>{counter1}</div>}
      {counter1 === 0 && <div className="countdown countdown-0">Go!</div>}
      <div className="count">Total IQ: {count}</div>
      <div
        className={`bobbingElement ${isClicked && "big"}`}
        onClick={handleClick}
      >
        {/* Click me! */}
        <img className="image" src="https://th.bing.com/th/id/OIP.qu70OyOo7iHNk0O8mRg0fgHaL2?rs=1&pid=ImgDetMain" alt="alternative-text"></img>
      </div>
      <div className="countdown30">Countdown: {counter === 0 ? "Time over" : counter}</div>
    </div>
  );
}
