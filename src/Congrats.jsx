import "./Congrats.css";
import useSocket from "./context/SocketContext";
import { getKeyOfLargestValue } from "./utils/dictionaryUtils";
import { useNavigate } from "react-router-dom";

function Congrats() {
  const { users, handleEndGame } = useSocket();
  const winner = getKeyOfLargestValue(users);
  const winnerIq = users[winner];
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/");
    handleEndGame();
  };

  return (
    <div className="container">
      <h1> Congratulations!</h1>
      <div className="subheading">
        <h2>To</h2>
        <div className="winner">{winner}</div>
        <h2> {`for a successful +${winnerIq} boost in IQ!`}</h2>
      </div>

      <button className="button" onClick={handleOnClick}>
        Home
      </button>
    </div>
  );
}

export default Congrats;
