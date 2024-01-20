import "./Homepage.css";
import { Link } from "react-router-dom";
import LeftRightPanel from "./components/LeftRightPanel";
import useSocket from "./context/SocketContext";
import { generateRandomString } from "./utils/stringUtils";

export default function Homepage() {
  const socket = useSocket();
  const roomCode = generateRandomString();

  // const handleClick = () => {
  //   socket.handleJoinRoom(roomCode, socket);
  // };

  return (
    <LeftRightPanel
      rightChild={
        <>
          <div
            style={{
              fontSize: "72px",
              textAlign: "center",
            }}
          >
            IQ BOOSTER
          </div>
          <div
            className="textCenter"
            style={{
              fontSize: "48px",
              textAlign: "center",
            }}
          >
            Give your IQ a boost?
          </div>
          <div className="buttonWrapper">
            <Link to={"singleplayer"}>
              <button className="button">Start</button>
            </Link>
            <Link to={"create-room"}>
              <button className="button">Create a room</button>
            </Link>
            <Link to={"join-a-room"}>
              <button className="button">Join a room</button>
            </Link>
          </div>
        </>
      }
    />
  );
}
