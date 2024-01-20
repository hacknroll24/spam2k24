import React, { useState } from "react";
import LeftRightPanel from "./components/LeftRightPanel";
import { Navigate } from "react-router-dom";

export default function CreateRoom() {
  function handleCreateRoom() {
    // socket.emit("createRoom");
    // socket.on("roomCreated", () => {
    //   Navigate("/game");
    // });

    if (!name) {
      setError(true);
    }

    console.log("creating room");
  }

  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  return (
    <LeftRightPanel
      leftChild={
        <>
          <div
            style={{
              fontSize: "48px",
              textAlign: "center",
              marginBottom: "70px",
            }}
          >
            Ready for the IQ boost?
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              fontSize: "36px",
            }}
          >
            <label>Name: </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              style={{
                width: "200px",
              }}
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              fontSize: "36px",
            }}
          >
            <button
              className="button"
              onClick={handleCreateRoom}
              style={{
                background: "white",
                color: "black",
                border: "white solid 1px",
              }}
            >
              Create Room
            </button>
          </div>
          {error && (
            <div
              style={{ color: "red", marginTop: "50px", marginInline: "auto" }}
            >
              Please enter a name!!!
            </div>
          )}
        </>
      }
    />
  );
}
