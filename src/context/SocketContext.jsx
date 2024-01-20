// MyContext.js
import { useMemo, createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import beep from "../assets/beep.mp3";
import { useNavigate } from "react-router-dom";

const SocketContext = createContext({});

// eslint-disable-next-line react/prop-types
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [isRoomJoined, setIsRoomJoined] = useState(false);
  const [user, setUser] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [users, setUsers] = useState({});
  const [countdown, setCountdown] = useState(-1);
  const [gameClock, setGameClock] = useState(-1);
  const navigate = useNavigate();

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
      navigate("/game");
    });

    sock.on("setCountdown", (duration) => {
      console.log(duration);
      setCountdown(duration);
      new Audio(beep).play();
    });

    sock.on("setGameClock", (time) => {
      console.log(time);
      setGameClock(time);
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
    navigate("/game");
    socket?.emit("startGame", roomCode);
  };

  const handleStartCountdown = () => {
    socket?.emit("startCountdown", roomCode);
  };
  const handleStartGameClock = () => {
    socket?.emit("startGameClock", roomCode);
  };

  const handleEndGame = () => {
    setIsRoomJoined(false);
    setUsers({});
    setUser("");
    setRoomCode("");
    setCountdown(-1);
    setGameClock(-1);
    socket?.emit("kickPlayer", roomCode, user);
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
      countdown,
      gameClock,
      handleJoinRoom,
      handleClick,
      handleStartGame,
      handleStartCountdown,
      handleStartGameClock,
      handleEndGame,
      handleDisconnect,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      user,
      roomCode,
      isRoomJoined,
      users,
      countdown,
      gameClock,
      handleJoinRoom,
      handleClick,
      handleStartGame,
      handleStartCountdown,
      handleStartGameClock,
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
