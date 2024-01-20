/* eslint-disable react/prop-types */
// src/App.jsx
import { useEffect, useRef } from "react";
import { useState } from "react";
import "./Countdown.css";
import useSocket from "./context/SocketContext";

import React from "react";
import "./MultiplayerGame.css";
import avatar1 from "./assets/avatar1.jpg";
import avatar2 from "./assets/avatar2.jpg";
import avatar3 from "./assets/avatar3.jpg";
import avatar4 from "./assets/avatar4.jpg";
import clicksound1 from "./assets/clicksound1.mp3";

const avatars = [avatar1, avatar2, avatar3, avatar4];

const namePositions = [{}]; //TODO

function ContestantBox({ index, playerName, iq, socketHandleClick }) {
  const { user } = useSocket();
  const boxBelongsToOtherPlayer = user !== playerName;

  const [isClicked, setIsClicked] = useState(false);
  const parentRef = useRef(null);
  const avatar = avatars[index];

  useEffect(() => {
    if (boxBelongsToOtherPlayer) {
      return;
    }

    const handleKeyPress = (event) => {
      if (event.key === " ") {
        handleClick();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

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
    <div className="contestantBox" ref={parentRef}>
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
  const { handleClick, users } = useSocket();

  return (
    <div className="grid">
      {Object.keys(users).map((playerName, index) => {
        return (
          <ContestantBox
            key={playerName}
            index={index}
            playerName={playerName}
            iq={users[playerName]}
            socketHandleClick={handleClick}
          />
        );
      })}
    </div>
  );
}
