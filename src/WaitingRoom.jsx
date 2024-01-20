import React, { Fragment, useState } from "react";
import LeftRightPanel from "./components/LeftRightPanel";

export default function WaitingRoom() {
  const [players, setPlayers] = useState([
    "dsalkd",
    "david",
    "joker",
    "bryann",
  ]);
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
          <button>Start</button>
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
            <input type="text"></input>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <label>Code:</label>
            <div>HFLAS</div>
          </div>
        </>
      }
    />
  );
}
