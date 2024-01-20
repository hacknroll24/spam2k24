import { Fragment, useState, useEffect } from "react";
import LeftRightPanel from "./components/LeftRightPanel";
import { useNavigate } from "react-router-dom";
import useSocket from "./context/SocketContext";

export default function WaitingRoom() {
  const [players, setPlayers] = useState([]);
  const [enoughPlayers, setEnoughPlayers] = useState(false);

  const navigate = useNavigate();
  const socket = useSocket();
  useEffect(() => {
    setPlayers(Object.keys(socket.users));

    setEnoughPlayers(Object.keys(socket.users).length >= 1);

    if (socket.isGameStarted && socket.timer == 5) navigate("/game");
  }, [socket, navigate]);

  const handleClick = () => {
    socket.handleStartTimer(5);
    socket.handleStartGame();
  };

  window.addEventListener("beforeunload", () => {
    // Disconnect the Socket.IO connection when the user leaves
    socket.handleDisconnect();
  });

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
            disabled={!enoughPlayers}
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
            <div>{socket.user}</div>
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
