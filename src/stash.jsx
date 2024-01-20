// src/App.jsx
import { useRef } from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

export default function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [socket, setSocket] = useState(null);
  const [count, setCount] = useState(0);
  const [roomJoined, setRoomJoined] = useState(false);
  const parentRef = useRef(null);

  const roomCode = 123;
  const user = "user";

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io(`http://localhost:${import.meta.env.VITE_API_PORT}`, {
      query: { roomCode, user },
    });
    setSocket(socket);

    // Handle events, emit messages, etc.
    socket.on("message", (data) => {
      console.log("Received message:", data);
    });

    socket.on("roomJoined", () => {
      setRoomJoined(true);
      console.log("room joined");
    });

    socket.on("currentPlayers", (currentPlayers) =>
      console.log(currentPlayers)
    );

    socket.on("updateClick", (ctx) =>
      console.log(`${ctx.user}'s IQ is now ${ctx.newIq}`)
    );

    // Clean up the connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) socket.emit("click", count);
  }, [count, socket]);

  const sendMessage = () => {
    const message = "Hello, Server!";
    socket.emit("sendMessage", message);
  };

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

    sendMessage();
  };

  return (
    <div className="parent-anchor" ref={parentRef}>
      {roomJoined && <div>Joined Room: {`${roomCode}`}</div>}
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
