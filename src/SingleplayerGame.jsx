import { useEffect, useRef, useState } from "react";
import "./SingleplayerGame.css";

import avatar1 from "./assets/avatar1.jpg";
import avatar2 from "./assets/avatar2.jpg";
import avatar3 from "./assets/avatar3.jpg";
import avatar4 from "./assets/avatar4.jpg";
import clicksound1 from "./assets/clicksound1.mp3";

const avatars = [avatar1, avatar2, avatar3, avatar4];

function SingleplayerGame() {
  const [iq, setIq] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const parentRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [avatarIndex, _] = useState(Math.floor(Math.random() * avatars.length));
  const avatar = avatars[avatarIndex];

  const handleKeyPress = (event) => {
    if (event.key === " " || event.key === "Spacebar") {
      handleClick();
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
    setIq(iq + 1);
  };

  return (
    <div className="sp">
      <div className="contestantBox" ref={parentRef}>
        <div className="instructions">Press spacebar or click to gain IQ!</div>

        <div className={`iqCounter ${isClicked && "big"}`}>Total IQ: {iq}</div>
        <img
          className={`bobbingImage ${isClicked && "small"}`}
          onClick={handleClick}
          src={avatar}
          alt="alternative-text"
          draggable={false}
        ></img>
      </div>
    </div>
  );
}

export default SingleplayerGame;
