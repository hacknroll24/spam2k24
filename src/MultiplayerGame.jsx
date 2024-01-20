/* eslint-disable react/prop-types */
// src/App.jsx
import { useEffect, useRef } from "react";
import { useState } from "react";
import "./Countdown.css";
import useSocket from "./context/SocketContext";
import { useNavigate } from "react-router-dom";

import "./MultiplayerGame.css";
import avatar1 from "./assets/avatar1.jpg";
import avatar2 from "./assets/avatar2.jpg";
import avatar3 from "./assets/avatar3.jpg";
import avatar4 from "./assets/avatar4.jpg";
import clicksound1 from "./assets/clicksound1.mp3";

const avatars = [avatar1, avatar2, avatar3, avatar4];

const namePositions = [{}]; //TODO

function ContestantBox({
  index,
  playerName,
  iq,
  timer,
  isInitialCountdown,
  socketHandleClick,
}) {
  const { user } = useSocket();
  const [isClicked, setIsClicked] = useState(false);
  const parentRef = useRef(null);
  const avatar = avatars[index];
  const boxBelongsToOtherPlayer = user !== playerName;
  const isDisabled =
    (timer != 0 && isInitialCountdown) || (timer == 0 && !isInitialCountdown);

  const handleKeyPress = (event) => {
    if (event.key === " " || event.key === "Spacebar") {
      if (!boxBelongsToOtherPlayer && !isDisabled) {
        handleClick();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  useEffect(() => {
    if (iq != 0) {
      new Audio(clicksound1).play();
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 50);

      animatePlusOne();
    }
  }, [iq]);

  function animatePlusOne() {
    const newDiv = document.createElement("div");
    newDiv.textContent = "IQ + 1";
    newDiv.classList.add("floatingText");
    parentRef.current.appendChild(newDiv);
    setTimeout(() => {
      newDiv.remove();
    }, 500);
  }

  const handleClick = () => {
    console.log(`calling socketHandleClick for user ${playerName}, iq=${iq}`);
    socketHandleClick(iq + 1, playerName);
  };

  return (
    <div
      className={`${isDisabled && "disable-click"} contestantBox`}
      ref={parentRef}
    >
      <div className={`iqCounter ${isClicked && "big"}`}>Total IQ: {iq}</div>
      <img
        className={`bobbingImage ${isClicked && "small"} ${
          boxBelongsToOtherPlayer && "disable-click"
        }`}
        onClick={handleClick}
        src={avatar}
        alt="alternative-text"
        draggable={false}
      ></img>
      <div className="playerName">{playerName}</div>
    </div>
  );
}
export default function MultiplayerGame() {
  const { users, timer, handleStartTimer, handleClick, handleEndGame } =
    useSocket();
  const [isInitialCountdown, setIsInitialCountdown] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer == 0 && isInitialCountdown) {
      handleStartTimer(7);
      setIsInitialCountdown(false);
    } else if (timer == 1 && !isInitialCountdown) {
      const navigateToCongrats = () => navigate("/congrats");
      setTimeout(navigateToCongrats, 1000);
    }
  }, [
    users,
    timer,
    isInitialCountdown,
    handleStartTimer,
    handleEndGame,
    navigate,
  ]);

  return (
    <div>
      {timer != 0 && isInitialCountdown && (
        <div className="initialCountDown">{timer}</div>
      )}

      {timer != 0 && !isInitialCountdown && (
        <div className="gameTimer">{timer}</div>
      )}

      <div className="grid">
        {Object.keys(users).map((playerName, index) => {
          return (
            <ContestantBox
              key={playerName}
              index={index}
              playerName={playerName}
              iq={users[playerName]}
              timer={timer}
              isInitialCountdown={isInitialCountdown}
              socketHandleClick={handleClick}
            />
          );
        })}
      </div>
    </div>
  );
}
