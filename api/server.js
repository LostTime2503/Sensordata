import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "superhemmelig123";

// MySQL-tilkobling
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error("DB-tilkoblingsfeil:", err);
  } else {
    console.log("API koblet til MySQL!");
  }
});

// ----------------------
// HENT TEMPERATURDATA
// ----------------------
app.get("/temperature", (req, res) => {
  db.query(
    "SELECT created_at, value FROM sensor_readings ORDER BY created_at",
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

// ----------------------
// REGISTRERING
// ----------------------
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Mangler brukernavn eller passord" });

  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (username, password_hash) VALUES (?, ?)",
    [username, hash],
    (err) => {
      if (err) {
        console.error("SQL-feil ved registrering:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Bruker registrert!" });
    }
  );

});

// ----------------------
// INNLOGGING
// ----------------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err || results.length === 0)
        return res.status(401).json({ error: "Feil brukernavn eller passord" });

      const user = results[0];

      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid)
        return res.status(401).json({ error: "Feil brukernavn eller passord" });

      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ message: "Innlogging vellykket", token });
    }
  );
});

// ----------------------
// BESKYTTET RUTE (eksempel)
// ----------------------
app.get("/protected", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Mangler token" });

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Du har tilgang!", user: decoded });
  } catch {
    res.status(401).json({ error: "Ugyldig token" });
  }
});

app.listen(3000, () => console.log("API kjører på port 3000"));
