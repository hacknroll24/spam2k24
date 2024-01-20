import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Homepage from "./Homepage.jsx";
import WaitingRoom from "./WaitingRoom.jsx";
import JoinARoom from "./JoinARoom.jsx";
import CreateRoom from "./CreateRoom.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/game",
    element: <App />,
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
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </React.StrictMode>
);
