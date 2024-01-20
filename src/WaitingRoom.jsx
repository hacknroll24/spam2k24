import React, { Fragment, useState, useEffect } from "react";
import LeftRightPanel from "./components/LeftRightPanel";

import { io } from "socket.io-client";

import { Navigate } from "react-router-dom";

export default function WaitingRoom() {
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState();

  useEffect(() => {
    // const url =
    //   process.env.NEXT_PUBLIC_ENV === "production"
    //     ? process.env.NEXT_PUBLIC_MATCHING_ENDPOINT
    //     : `http://localhost:${process.env.NEXT_PUBLIC_MATCHING_SERVICE_PORT}`;
    const url = "test";

    const socket = io(url || "", {
      autoConnect: false,
    });

    setSocket(socket);

    socket.on("start", (room_id) => {
      Navigate("/game");
      // setRoomId(room_id);
    });

    socket.on("playerJoin", (players) => {
      setPlayers(players);
    });

    return () => {
      socket.off("playerJoin");
      socket.off("start");
    };
  }, []);

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
            <div>HFLAS</div>
          </div>
        </>
      }
    />
  );
}
