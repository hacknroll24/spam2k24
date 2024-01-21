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

  function getLeaderBoard() {
    const scores = Object.keys(users).map((playerName) => {
      return { name: playerName, score: users[playerName] };
    });

    scores.sort((a, b) => b.score - a.score);
    return scores;
  }

  return (
    <div className="container">
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1> Congratulations!</h1>
        <div
          className="subheading"
          style={{
            fontSize: "1.5rem",
            letterSpacing: "0.3rem",
          }}
        >
          <h2>To</h2>
          <div className="winner">{winner}</div>
          <h2> {`for a successful +${winnerIq} boost in IQ!`}</h2>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          fontSize: "2rem",
        }}
      >
        {getLeaderBoard().map((scoreInfo, index) => (
          <div
            style={{
              display: "flex",
            }}
            key={scoreInfo.score + scoreInfo.name}
          >
            <div
              style={{
                marginRight: "10px",
              }}
            >
              {index + 1}. {scoreInfo.name}
            </div>
            <div>{scoreInfo.score}</div>
          </div>
        ))}
      </div>

      <button className="button" onClick={handleOnClick}>
        Home
      </button>
    </div>
  );
}

export default Congrats;
