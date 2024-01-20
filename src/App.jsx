// src/App.jsx
import { useEffect, useRef } from "react";
import { useState } from "react";
import React from "react";
import "./App.css";
import "./Countdown.css";

function ContestantBox({
  player,
  players,
  setPlayers,
  // initialCountdown,
  // remainingTime,
}) {
  const [isClicked, setIsClicked] = useState(false);
  // const isGameStarted = remainingTime > 0 && initialCountdown === 0;

  const iq = players[player];
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
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 10);

    const newPlayers = {
      ...players,
      [player]: iq + 1,
    };
    console.log(newPlayers);

    setPlayers(newPlayers);
    // emit event

    animatePlusOne();
  };

  return (
    <div className="contestantBox" ref={parentRef}>
      <div
        style={{
          fontSize: "30px",
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translate(-50%)",
        }}
      >
        Total IQ: {iq}
      </div>
      <img
        className={`bobbingElement ${isClicked && "big"}`}
        onClick={handleClick}
        src="https://th.bing.com/th/id/OIP.qu70OyOo7iHNk0O8mRg0fgHaL2?rs=1&pid=ImgDetMain"
        alt="alternative-text"
      ></img>
    </div>
  );
}
export default function App() {
  const [remainingTime, setRemainingTime] = React.useState(30);
  const [initialCountdown, setInitialCountdown] = useState(3);

  const [players, setPlayers] = useState({
    Shiying: 0,
    Zhiwei: 0,
    Bryann: 0,
    Alvin: 0,
  });

  // useEffect(() => {
  //   // Check if the 3-second timer has finished
  //   if (initialCountdown > 0) {
  //     const timer = setTimeout(() => {
  //       setInitialCountdown(initialCountdown - 1);
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   } else {
  //     // The 3-second timer has finished, start the 30-second timer
  //     remainingTime > 0 &&
  //       setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
  //   }
  // }, [initialCountdown, remainingTime]);

  // console.log(players);

  return (
    <div className="grid">
      {Object.keys(players).map((player, index) => {
        return (
          <ContestantBox
            key={player}
            index={index}
            player={player}
            players={players}
            setPlayers={setPlayers}
            // remainingTime={remainingTime}
            // initialCountdown={initialCountdown}
          />
        );
      })}
    </div>
  );
}
