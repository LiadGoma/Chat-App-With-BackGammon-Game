const express = require("express");
const mongoose = require("mongoose");
const app = express();
const users = require("./routes/user");
const auth = require("./routes/auth");
const messages = require("./routes/message");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();

const port = process.env.PORT || 3001;
app.options('*', cors());

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/messages", messages);
app.use(cors);



const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "https://realtime-chat-app-backgammon.herokuapp.com",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});


const db = process.env.Database_Key;
mongoose.connect(db)
    .then(() => console.log("db connected"))
    .catch((error) => console.log(error));


server.listen(port, () => console.log("server running"));


module.exports = server;