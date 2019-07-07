import express from "express";
import { join } from "path";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 3000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));
app.use(logger("dev"));
app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
  console.log(`Server running: http://localhost:${PORT} ✔`);

const server = app.listen(PORT, handleListening);

// http://localhost:3000/socket.io/socket.io.js 로 제대로 돼있는지 확인
// io라는 변수 만든 이유는 서버를 만들어서 socketIO에게 전달하기 위해
// io는 모든 이벤트를 알아야하기 때문
const io = socketIO.listen(server);

io.on("connection", socket => {
  // emit: 방금 연결된 소켓에게 메시지를 보냄
  // broadcast: 방금 접속한 클라이언트를 제외하고 모든 클라이언트에게 이벤트를 보낸다.
  // setTimeout(() => socket.broadcast.emit("hello"), 5000);
  socket.on("newMessage", ({ message }) => {
    socket.broadcast.emit("messageNotif", {
      message,
      nickname: socket.nickname || "Anon"
    });
  });
  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });
});
