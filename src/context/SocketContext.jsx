// MyContext.js
import { useMemo, createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import beep from "../assets/beep.mp3";

const SocketContext = createContext({});

// eslint-disable-next-line react/prop-types
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [isRoomJoined, setIsRoomJoined] = useState(false);
  const [user, setUser] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [users, setUsers] = useState({});
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Connect to the Socket.IO server
    const sock = io(`http://localhost:${import.meta.env.VITE_API_PORT}`);
    setSocket(sock);

    // Handle events, emit messages, etc.
    sock.on("message", (data) => {
      console.log("Received message:", data);
    });

    sock.on("roomJoined", () => {
      setIsRoomJoined(true);
    });

    sock.on("updateClick", (user, newIq) => {
      setUsers((prevUsers) => ({
        ...prevUsers,
        [user]: newIq,
      }));
    });

    sock.on("userList", (userList) => {
      let newUsers = {};
      Object.values(userList).forEach((user) => {
        newUsers = {
          ...newUsers,
          [user]: 0,
        };
        setUsers(newUsers);
      });
    });

    sock.on("startGame", () => {
      setIsGameStarted(true);
    });

    sock.on("setTimer", (duration) => {
      setTimer(duration);
      new Audio(beep).play();
    });

    return () => {
      sock.off("startGame");
      sock.off("userList");
      sock.off("updateClick");
      sock.off("roomJoined");
      sock.off("message");
    };
  }, []);

  const handleJoinRoom = (roomCode, user) => {
    setUser(user);
    setRoomCode(roomCode);
    socket?.emit("joinRoom", { roomCode, user });
  };

  const handleClick = (newIq, user) => {
    socket?.emit("click", newIq, user, roomCode);

    setUsers((prevUsers) => ({
      ...prevUsers,
      [user]: newIq,
    }));
  };

  const handleStartGame = () => {
    setIsGameStarted(true);
    socket?.emit("startGame", roomCode);
  };

  const handleStartTimer = (duration) => {
    socket?.emit("startTimer", roomCode, duration);
  };

  const handleEndGame = () => {
    setIsGameStarted(false);
    setUsers({});
    socket?.emit("kickPlayers", roomCode);
  };

  const handleDisconnect = () => {
    socket?.disconnect();
  };

  const memoedValue = useMemo(
    () => ({
      user,
      roomCode,
      isRoomJoined,
      users,
      isGameStarted,
      timer,
      handleJoinRoom,
      handleClick,
      handleStartGame,
      handleStartTimer,
      handleEndGame,
      handleDisconnect,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      user,
      roomCode,
      isRoomJoined,
      users,
      isGameStarted,
      timer,
      handleJoinRoom,
      handleClick,
      handleStartGame,
      handleStartTimer,
      handleEndGame,
      handleDisconnect,
      socket,
    ]
  );

  return (
    <SocketContext.Provider value={memoedValue}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  return useContext(SocketContext);
};

export default useSocket;
