// src/App.jsx
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Make a request to your Express server
    fetch(`http://localhost:${import.meta.env.VITE_API_PORT}/api/data`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Vite React App</h1>
      {data && <p>Data from server: {data.message}</p>}
    </div>
  );
}

export default App;
