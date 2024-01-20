import "./Congrats.css";
import useSocket from "./context/SocketContext";
import { getKeyOfLargestValue } from "./utils/dictionaryUtils";
import { Link } from "react-router-dom";

function Congrats() {
  const { users, handleEndGame } = useSocket();
  const winner = getKeyOfLargestValue(users);
  const winnerIq = users[winner];

  const handleOnClick = () => {
    handleEndGame();
  };

  return (
    <div className="container">
      <h1> Congratulations!</h1>
      <h2>{`To ${winner} for a successful +${winnerIq} boost in IQ!`}</h2>
      <Link to={"/"}>
        <button onClick={handleOnClick}>Home</button>
      </Link>
    </div>
  );
}

export default Congrats;
