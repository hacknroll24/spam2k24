// src/App.jsx
import { useEffect, useRef } from "react";
import { useState } from "react";
import React from "react";
import "./App.css";
import "./Countdown.css";

function ContestantBox({ initialCountdown, remainingTime }) {
  const [isClicked, setIsClicked] = useState(false);
  const [iq, setIq] = useState(0);

  const isGameStarted = remainingTime > 0 && initialCountdown === 0;

  const parentRef = useRef(null);

  function animatePlusOne() {
    const newDiv = document.createElement("div");
    newDiv.textContent = "IQ + 1";
    newDiv.classList.add("floatingText");
    parentRef.current.appendChild(newDiv);
    setTimeout(() => {
      newDiv.remove();
    }, 10);
  }

  const handleClick = () => {
    // if (counter > 0 && counter1 === 0) {
    if (isGameStarted) {
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 10); // resets back after 0.5 seconds
      setIq((prev) => prev + 1);

      animatePlusOne();
    } else {
      setIsClicked(false);
    }
  };

  return (
    <div className="parent-anchor" ref={parentRef}>
      {initialCountdown > 0 && (
        <div className={`countdown countdown-${initialCountdown}`}>
          {initialCountdown}
        </div>
      )}
      {initialCountdown === 0 && (
        <div className="countdown countdown-0">Go!</div>
      )}
      <div className="countdown30">
        Countdown: {remainingTime === 0 ? "Time over" : remainingTime}
      </div>
      <div className="count">Total IQ: {iq}</div>
      <div
        className={`bobbingElement ${isClicked && "big"}`}
        onClick={handleClick}
      >
        {/* Click me! */}
        <img
          className="image"
          src="https://th.bing.com/th/id/OIP.qu70OyOo7iHNk0O8mRg0fgHaL2?rs=1&pid=ImgDetMain"
          alt="alternative-text"
        ></img>
      </div>
    </div>
  );
}

export default function App() {
  // const [score, setScore] = useState({});
  const [remainingTime, setRemainingTime] = React.useState(30);
  const [initialCountdown, setInitialCountdown] = useState(3);

  useEffect(() => {
    // Check if the 3-second timer has finished
    if (initialCountdown > 0) {
      const timer = setTimeout(() => {
        setInitialCountdown(initialCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // The 3-second timer has finished, start the 30-second timer
      remainingTime > 0 &&
        setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
    }
  }, [initialCountdown, remainingTime]);

  return (
    <div className="grid">
      <ContestantBox
        remainingTime={remainingTime}
        initialCountdown={initialCountdown}
      />
    </div>
  );
}
