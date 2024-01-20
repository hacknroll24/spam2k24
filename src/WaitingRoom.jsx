import { Fragment, useState, useEffect } from "react";
import LeftRightPanel from "./components/LeftRightPanel";
import { useNavigate } from "react-router-dom";
import useSocket from "./context/SocketContext";

export default function WaitingRoom() {
  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();
  const socket = useSocket();
  useEffect(() => {
    setPlayers(Object.keys(socket.users));
  }, [socket]);

  const handleClick = () => {
    if (Object.keys(socket.users).length === 2) navigate("/game");
  };

  return (
    <LeftRightPanel
      rightChild={
        <>
          {players.map((player, index) => (
            <Fragment key={player}>
              <div style={{}}>
                <div>
                  Player {index}: {player}
                </div>
                <div
                  style={{
                    padding: "10px",
                    width: "100px",
                  }}
                ></div>
              </div>
            </Fragment>
          ))}
          <button
            style={{
              width: "300px",
            }}
            onClick={handleClick}
          >
            Start
          </button>
        </>
      }
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
            <div>dsads</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <label>Code:</label>
            <div>{socket.roomCode}</div>
          </div>
        </>
      }
    />
  );
}
