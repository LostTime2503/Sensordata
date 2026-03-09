import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [data, setData] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const register = async () => {
    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const json = await res.json();
      setMessage(json.message || json.error);

      if (json.message === "Bruker registrert!") {
        setIsRegister(false);
      }
    } catch (err) {
      setMessage("Klarte ikke å kontakte serveren");
    }
  };

  const login = async () => {
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const json = await res.json();
      setMessage(json.message || json.error);

      if (json.token) {
        localStorage.setItem("token", json.token);
        setToken(json.token);
      }
    } catch (err) {
      setMessage("Klarte ikke å kontakte serveren");
    }
  };

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:3001/temperature")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setMessage("Kunne ikke hente temperaturdata"));
  }, [token]);

  if (!token) {
    return (
      <div style={{ width: "300px", margin: "40px auto" }}>
        <h2>{isRegister ? "Registrer bruker" : "Logg inn"}</h2>

        <input
          placeholder="Brukernavn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Passord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isRegister ? (
          <button onClick={register}>Registrer</button>
        ) : (
          <button onClick={login}>Logg inn</button>
        )}

        <p>{message}</p>

        <button
          style={{ marginTop: "10px" }}
          onClick={() => {
            setIsRegister(!isRegister);
            setMessage("");
          }}
        >
          {isRegister ? "Har du bruker? Logg inn" : "Ingen bruker? Registrer deg"}
        </button>
      </div>
    );
  }

  if (data.length === 0) {
    return <p>Laster temperaturdata...</p>;
  }

  const labels = data.map((entry) =>
    new Date(entry.created_at).toLocaleTimeString("no-NO", {
      hour: "2-digit",
      minute: "2-digit"
    })
  );

  const values = data.map((entry) => entry.value);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Temperatur (°C)",
        data: values,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        tension: 0.3,
        pointRadius: 3
      }
    ]
  };

  return (
    <div style={{ width: "600px", margin: "40px auto", textAlign: "center" }}>
      <h2>Sensordata – Temperatur over tid</h2>
      <Line data={chartData} />

      <button
        style={{ marginTop: "20px" }}
        onClick={() => {
          localStorage.removeItem("token");
          setToken(null);
        }}
      >
        Logg ut
      </button>
    </div>
  );
}

export default App;
