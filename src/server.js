import express from "express";
import { join } from "path";
import socketIO from "socket.io";

const PORT = 3000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));

app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
  console.log(`Server running: http://localhost:${PORT} ✔`);

const server = app.listen(PORT, handleListening);

// http://localhost:3000/socket.io/socket.io.js 로 제대로 돼있는지 확인
const io = socketIO(server);
