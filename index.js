// app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./connection");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// READ
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// CREATE
app.post("/users", (req, res) => {
  const { id, name, email, password } = req.body;
  const query = "INSERT INTO users (id, name,email, password ) VALUES (?, ?, ?, ?)";

  connection.query(query, [id, name, email, password], (err, results) => {
    if (err) throw err;
    res.json({ message: "User created successfully", id: results.insertId });
  });
});

// UPDATE
app.put("/users/:id", (req, res) => {
  const { name, email, password } = req.body;
  const id = req.params.id;
  const query = "UPDATE users SET name=?, email=?, password=? WHERE id=?";

  connection.query(query, [name, email, password, id], (err) => {
    if (err) throw err;
    res.json({ message: "User updated successfully" });
  });
});

// DELETE
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM users WHERE id=?";

  connection.query(query, [id], (err) => {
    if (err) throw err;
    res.json({ message: "User deleted successfully" });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
