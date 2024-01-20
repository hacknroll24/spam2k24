import { Fragment, useState, useEffect } from "react";
import LeftRightPanel from "./components/LeftRightPanel";
// import { useNavigate } from "react-router-dom";
import useSocket from "./context/SocketContext";

export default function WaitingRoom() {
  const [players, setPlayers] = useState([]);
  const [enoughPlayers, setEnoughPlayers] = useState(false);

  const socket = useSocket();

  useEffect(() => {
    setPlayers(Object.keys(socket.users));
    setEnoughPlayers(Object.keys(socket.users).length >= 1);
  }, [socket]);

  const handleClick = () => {
    socket.handleStartCountdown();
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
              <div
                className="playerRow"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Player {index + 1}:
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                    height: "70px",
                    width: "300px",
                    border: "2px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  {player}
                </div>
              </div>
            </Fragment>
          ))}
          <button
            className="button reversedColor"
            onClick={handleClick}
            disabled={!enoughPlayers}
          >
            START
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
            <div
              style={{
                backgroundColor: "white",
                width: "200px",
                color: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingY: "5px",
              }}
            >
              {socket.user}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <label>Code:</label>
            <div
              style={{
                backgroundColor: "white",
                width: "200px",
                color: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingY: "5px",
              }}
            >
              {socket.roomCode}
            </div>
          </div>
        </>
      }
    />
  );
}
