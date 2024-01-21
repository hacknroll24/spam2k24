import "./Homepage.css";
import { Link } from "react-router-dom";
import LeftRightPanel from "./components/LeftRightPanel";
import gojo from "./assets/handsome.jpg";

export default function Homepage() {
  return (
    <LeftRightPanel
      leftChild={
        <img
          src={gojo}
          style={{
            height: "100%",
            width: "100%",
          }}
        ></img>
      }
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
              <button className="button hoverChangeColor">Start</button>
            </Link>
            <Link to={"create-room"}>
              <button className="button hoverChangeColor">Create a room</button>
            </Link>
            <Link to={"join-a-room"}>
              <button className="button hoverChangeColor">Join a room</button>
            </Link>
          </div>
        </>
      }
    />
  );
}
