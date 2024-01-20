// src/App.jsx
import { useRef } from "react";
import { useState } from "react";
import "./App.css";

export default function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [count, setCount] = useState(0);
  const parentRef = useRef(null);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 10); // resets back after 0.5 seconds
    setCount((prev) => prev + 1);

    // animate
    const newDiv = document.createElement("div");
    newDiv.textContent = "IQ + 1";
    newDiv.classList.add("floatingText");
    parentRef.current.appendChild(newDiv);
    setTimeout(() => {
      newDiv.remove();
    }, 1000);
  };

  return (
    <div className="parent-anchor" ref={parentRef}>
      <div className="count">Total IQ: {count}</div>
      <div
        className={`bobbingElement ${isClicked && "big"}`}
        onClick={handleClick}
      >
        Click me!
      </div>
    </div>
  );
}
