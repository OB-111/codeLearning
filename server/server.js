const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/conn");
const codeRouter = require("./routes/codeBlock.route");
const http = require("http");
const { Server } = require("socket.io");
app.use(cors());
app.use(express.json());
app.use("/api", codeRouter);
const server = http.createServer(app);

// create a new Socket
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001","http://moveoProject.onrender.com"]
  },
});

io.on("connection", (socket) => {
  socket.on("send_updateCode", (data) => {
    socket.broadcast.emit("codeUpdate", data.updatedCode);
  });
});

// determinate User Role
let entriesCount = 0;
app.get("/checkRole", (req, res) => {
  const role = entriesCount === 0 ? "mentor" : "student";
  entriesCount += 1;
  res.status(200).json(role);
});

// perform a database connsection when the server starts
db.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  server.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
});
