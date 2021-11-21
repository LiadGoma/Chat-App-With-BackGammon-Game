const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const port = process.env.PORT || 3002;

app.options('*', cors());

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.use(cors());


const server = http.createServer(app);


// const io = new Server(server, {
//     cors: {
//         origin: "https://realtime-chat-app-backgammon.herokuapp.com",
//         methods: ["GET", "POST", "PUT", "DELETE"],

//     },
// });
const io = new Server(server, {
    cors: {
        origin: "https://realtime-chat-app-backgammon.herokuapp.com",
        methods: ["GET", "POST", "PUT", "DELETE"],

    },
});



server.listen(port, () => console.log("server running"));

let users = []

const addUser = (userId, socketId) => {
    if (!userId) return;
    !users.some(user => user.userId === userId) && users.push({ userId, socketId });
}
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}

io.on("connection", (socket) => {
    console.log(" a user connected");


    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        console.log("sending user emit");
        io.emit("getUsers", users);
    })
    socket.on("sendMessage", (senderId, recieverId, text) => {
        console.log("sendMessage method");
        const user = getUser(recieverId);
        io.to(user?.socketId).emit("getMessage", {
            senderId, text, recieverId
        });
    })
    socket.on("inviteToGame", (recieverId, senderId) => {
        console.log("invited to game");
        socket.join(`${recieverId},${senderId}`);
        const user = getUser(recieverId);

        io.to(user?.socketId).emit("invitedToGame", {
            roomName: `${recieverId},${senderId}`,
            senderId: senderId
        });
    });
    socket.on("playerAcceptedGame", (roomName) => {
        console.log("game accepted");
        socket.join(roomName);
        io.to(roomName).emit("startGame", roomName);
    });

    socket.on("connectToRoom", (roomName) => {
        console.log("connectong to room");
        socket.join(roomName);
    })
    socket.on("rollDice", (number1, number2, roomName) => {
        console.log("rolling dice");
        io.to(roomName).emit("enemyRolledDice", { number1: number1, number2: number2 });
    })
    socket.on("movePiece", (roomName, itemId, place, isMyTurn) => {
        console.log("moving piece");
        io.to(roomName).emit("enemyMovedPiece", { itemId: itemId, place: place, isMyTurn: isMyTurn })
    })

    socket.on("addPieceToBox", (item, roomName) => {
        console.log("addPieceToBox");
        io.to(roomName).emit("enemyRemovePiece", { item: item });
    })

    socket.on("endTurn", (roomName, color) => {

        console.log("turn ended");
        io.to(roomName).emit("switchTurns", color);
    })

    socket.on("playerQuitGame", (roomName) => {
        io.to(roomName).emit("oppositeQuit");
    })

    socket.on("disconnect", () => {
        console.log("a user disconnectd");
        removeUser(socket.id);

        io.emit("getUsers", users);
    })
})