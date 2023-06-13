import express from "express";
import dotenv from "dotenv";
import db from "./db.js";

const app = express();

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());

db.getConnection((err) => {
  if (err) console.log(err);

  console.log(`DB connected`);
});

app.get("/", (req, res) => {
  db.query("SELECT * FROM biker", (err, result) => {
    if (err) res.status(500).json({ message: "Server Error", data: [] });

    res.status(200).json({ message: "Success", data: result });
  });
});

app.post("/", (req, res) => {
  const name = req.body.name || "";

  if (!name) return res.status(400).json({ message: "Name cannot be empty" });

  const sql = "INSERT INTO biker (name) VALUES (?)";

  db.query(sql, [name], (err, result) => {
    if (err) return res.status(500).json(err);

    res.status(201).json(result);
  });
});

app.listen(PORT, () => console.log(`Server listen on ${PORT}`));
