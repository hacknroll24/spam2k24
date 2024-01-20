import React from "react";
import LeftRightPanel from "./components/LeftRightPanel";

export default function JoinARoom() {
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
            <input name="code" type="text"></input>
          </div>
          <button>Join</button>
        </>
      }
    />
  );
}
