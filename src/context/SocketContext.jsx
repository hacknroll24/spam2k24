// MyContext.js
import { useMemo, createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext({});

// eslint-disable-next-line react/prop-types
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [isRoomJoined, setIsRoomJoined] = useState(false);
  const [user, setUser] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [users, setUsers] = useState({});

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

    sock.on("updateClick", (ctx) =>
      console.log(`${ctx.user}'s IQ is now ${ctx.newIq}`)
    );

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
  }, [isRoomJoined]);

  const handleJoinRoom = (roomCode, user) => {
    setUser(user);
    setRoomCode(roomCode);
    socket?.emit("joinRoom", { roomCode, user });
  };

  const handleClick = (newIq, user) => {
    socket?.to(roomCode).emit("click", { newIq, user });
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
      handleJoinRoom,
      handleClick,
      handleDisconnect,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      user,
      roomCode,
      isRoomJoined,
      users,
      handleJoinRoom,
      handleClick,
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
