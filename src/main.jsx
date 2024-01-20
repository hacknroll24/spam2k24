import React from "react";
import ReactDOM from "react-dom/client";
import MultiplayerGame from "./MultiplayerGame.jsx";

import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import "./index.css";
import Homepage from "./Homepage.jsx";
import WaitingRoom from "./WaitingRoom.jsx";
import JoinARoom from "./JoinARoom.jsx";
import CreateRoom from "./CreateRoom.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

import { BrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/game",
    element: <MultiplayerGame />,
  },
  {
    path: "/waiting-room",
    element: <WaitingRoom />,
  },
  {
    path: "/create-room",
    element: <CreateRoom />,
  },
  {
    path: "/join-a-room",
    element: <JoinARoom />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/game" element={<MultiplayerGame />} />
          <Route path="/waiting-room" element={<WaitingRoom />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/join-a-room" element={<JoinARoom />} />
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>
);
