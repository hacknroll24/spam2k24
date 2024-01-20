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

const avatars = [avatar1, avatar2, avatar3, avatar4];

const namePositions = [{}]; //TODO

function ContestantBox({ index, playerName, iq, socketHandleClick }) {
  const [isClicked, setIsClicked] = useState(false);
  const parentRef = useRef(null);
  const avatar = avatars[index];

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
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 50);

    socketHandleClick(iq + 1, playerName);

    animatePlusOne();
  };

  return (
    <div className="contestantBox" ref={parentRef}>
      <div className={`iqCounter ${isClicked && "big"}`}>Total IQ: {iq}</div>
      <img
        className={`bobbingImage ${isClicked && "small"}`}
        onClick={handleClick}
        src={avatar}
        alt="alternative-text"
      ></img>
      <div className="playerName">{playerName}</div>
    </div>
  );
}
export default function MultiplayerGame() {
  const socket = useSocket();
  const [players, setPlayers] = useState(socket.users);

  useEffect(() => {
    console.log(socket.users);
    setPlayers(socket.users);
  }, [socket.users, players, socket.user]);

  return (
    <div className="grid">
      {Object.keys(players).map((playerName, index) => {
        return (
          <ContestantBox
            key={playerName}
            index={index}
            playerName={playerName}
            iq={players[playerName]}
            socketHandleClick={socket.handleClick}
          />
        );
      })}
    </div>
  );
}
