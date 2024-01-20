// src/App.jsx
import { useRef } from "react";
import { useState } from "react";
import "./App.css";
import "./Countdown.css";
// import useSocket from "./context/SocketContext";

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
  const [players, setPlayers] = useState({
    Shiying: 0,
    Zhiwei: 0,
    Bryann: 0,
    Alvin: 0,
  });

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
          />
        );
      })}
    </div>
  );
}
