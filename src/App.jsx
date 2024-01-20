/* eslint-disable react/prop-types */
// src/App.jsx
import { useEffect, useRef } from "react";
import { useState } from "react";
import "./App.css";
import "./Countdown.css";
import useSocket from "./context/SocketContext";

function ContestantBox({ player, iq, socketHandleClick }) {
  const [isClicked, setIsClicked] = useState(false);

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

    socketHandleClick(iq + 1, player);

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
  const socket = useSocket();
  const [players, setPlayers] = useState(socket.users);

  useEffect(() => {
    console.log(socket.users);
    setPlayers(socket.users);
  }, [socket.users, players, socket.user]);

  return (
    <div className="grid">
      {Object.keys(players).map((player, index) => {
        return (
          <ContestantBox
            key={player}
            index={index}
            player={player}
            iq={players[player]}
            socketHandleClick={socket.handleClick}
          />
        );
      })}
    </div>
  );
}
