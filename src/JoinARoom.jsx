import { useState, useEffect } from "react";
import LeftRightPanel from "./components/LeftRightPanel";
import { useNavigate } from "react-router-dom";
import useSocket from "./context/SocketContext";

export default function JoinARoom() {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (socket && socket.isRoomJoined) {
      navigate("/waiting-room");
    }
  }, [socket, navigate]);

  const handleClick = () => {
    socket.handleJoinRoom(roomCode, name);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeCode = (e) => {
    setRoomCode(e.target.value.toUpperCase());
  };

  return (
    <LeftRightPanel
      leftChild={
        <>
          <div
            style={{
              fontSize: "48px",
              textAlign: "center",
            }}
          >
            Ready for the IQ boost?
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <label>Name: </label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={onChangeName}
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <label>Code:</label>
            <input
              name="code"
              type="text"
              value={roomCode}
              onChange={onChangeCode}
            ></input>
          </div>
          <button className="button" onClick={handleClick}>
            Join
          </button>
        </>
      }
    />
  );
}
