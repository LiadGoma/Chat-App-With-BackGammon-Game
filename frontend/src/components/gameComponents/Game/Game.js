import "./Game.css";
import React, { useEffect, useState, useRef } from 'react'
import GameBoard from "../GameBoard/GameBoard";
import RollDice from "../RollDice/RollDice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PiecesBox from "../PiecesBox/PiecesBox";
import gameService from "../../../services/gameService";
import game from "../../../services/gameService";
import { io } from "socket.io-client";
import { movePiece } from "../../../services/gameService";
import Jail from "../Jail/Jail";
import Winning from "../Winning/Winning";
import Losing from "../Losing/Losing";
import Modal from "../../Modal/Modal";


function Game(props) {
    const [isMyTurn, setIsMyTurn] = useState();
    const [color, setColor] = useState('');
    const [whiteBox, setWhiteBox] = useState([]);
    const [blackBox, setBlackBox] = useState([]);
    const [jailBox, setJailBox] = useState([]);
    const [enemyRoll, setEnemyRoll] = useState((localStorage.getItem("color") === "white" ? true : false));
    const [gameArray, setGameArray] = useState([]);
    const [rolledOnce, setRolledOnce] = useState(false);
    const [isWon, setIsWon] = useState(false);
    const [isLost, setIsLost] = useState(false);
    const [openModalQuit, setOpenModalQuit] = useState(false);
    const [openModalQuitPermission, setOpenModalQuitPermission] = useState(false);
    const [seconds, setSeconds] = useState(60);


    useEffect(() => {
        if(seconds<1){
            if(isMyTurn)
            {
                endTurn();
            }
        }
        const timer =
            seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
        return () => clearInterval(timer);
    }, [seconds]);


    useEffect(() => {
        setGameArray(game.gameBoard);
    }, [])



    const socket = useRef();
    useEffect(() => {
        socket.current = io("https://chat-app-backgammon-server.herokuapp.com");
        //"ws://localhost:3002"
        socket.current.on("enemyRolledDice", (data) => {
            setEnemyRoll({ number1: data.number1, number2: data.number2 });
            localStorage.setItem("value1", data.number1);
            localStorage.setItem("value2", data.number2);
            if (localStorage.getItem("value1") === localStorage.getItem("value2")) {
                localStorage.setItem("value3", data.number1);
                localStorage.setItem("value4", data.number2);
            }
            setRolledOnce(true);
        })

        socket.current.on("enemyMovedPiece", (data) => {
            movePiece(data.itemId, data.place, true);
            updateBoard();
        })
        socket.current.on("enemyRemovePiece", (data) => {
            game.addPieceToBox(data.item);
            updateBoard();
        })
        socket.current.on("oppositeQuit", () => {
            setIsWon(true);
            setOpenModalQuit(true);
            // props.history.replace("/");
        })
    }, [])

    useEffect(() => {
        socket.current.on("switchTurns", (senderColor) => {
            if (senderColor === localStorage.getItem("userColor")) return;
            console.log("switchTurns");
            localStorage.removeItem("value1");
            localStorage.removeItem("value2");
            localStorage.removeItem("value3");
            localStorage.removeItem("value4");
            switchTheTurn();
        })
    }, [])


    useEffect(() => {
        socket.current.emit("connectToRoom", localStorage.getItem("roomName"));

    }, [])

    useEffect(() => {
        setWhiteBox(gameService.whitePiecesBox);
        setBlackBox(gameService.blackPiecesBox);
        setJailBox(gameService.jail.pieces);
        setColor(localStorage.getItem("userColor"));
        if (color === "white") {
            setIsMyTurn(true);
        }
        if (color === "black") {
            setIsMyTurn(false);
        }
    }, [color])

    const switchTheTurn = () => {
        setSeconds(60);
        setIsMyTurn(null);
        setIsMyTurn(true);
        setRolledOnce(false);
    }

    const endTurn = () => {
        setSeconds(60);
        setIsMyTurn(false);
        setRolledOnce(false);
        socket.current.emit("endTurn", localStorage.getItem("roomName"), color);
    }
    const updateBoard = () => {
        const newGameArray = game.gameBoard;
        setGameArray([]);
        setGameArray([...newGameArray]);
        const newJailBox = game.jail.pieces;
        setJailBox([]);
        setJailBox([...newJailBox]);

    }
    const updateWhiteBox = () => {
        const newPiecesBox = gameService.whitePiecesBox;
        setWhiteBox([]);
        setWhiteBox(newPiecesBox);
        updateBoard();

        if (newPiecesBox.length > 14 && localStorage.getItem("userColor") === "white") {
            setIsWon(true);
        }
        else if (newPiecesBox.length > 14 && localStorage.getItem("userColor") === "black") {
            setIsLost(true);
        }
    }


    const updateBlackBox = () => {
        const newPiecesBox = gameService.blackPiecesBox;
        setBlackBox([]);
        setBlackBox(newPiecesBox);
        updateBoard();

        if (newPiecesBox.length > 14 && localStorage.getItem("userColor") === "black") {
            setIsWon(true);
        }
        else if (newPiecesBox.length > 14 && localStorage.getItem("userColor") === "white") {
            setIsLost(true);
        }
    }

    const updateJailBox = () => {
        const newJailBox = gameService.jail;
        setJailBox([]);
        setJailBox(newJailBox);
        updateBoard();
    }
    const quitGame = () => {
        setOpenModalQuitPermission(true);
    }
    const quitGameEnsured = () => {
        props.history.replace("/");
        socket.current.emit("playerQuitGame", localStorage.getItem("roomName"));
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <PiecesBox socket={socket} pieces={blackBox} updateBox={updateBlackBox} />
            <div className="gameBox">
                {isWon && <Winning />}
                {isLost && <Losing />}
                {!isWon && !isLost && <GameBoard colorOfTheUser={color} socket={socket}
                    isMyTurn={isMyTurn} updateBoard={updateBoard} gameArray={gameArray} />}
                <Modal text="Your friend quit the game" open={openModalQuit} acceptMethod={() => setOpenModalQuit(false)} />
                <Modal text="Are you sure you want to quit?" open={openModalQuitPermission} acceptMethod={quitGameEnsured} rejectMethod={() => setOpenModalQuitPermission(false)} />
                <Jail socket={socket}
                    pieces={jailBox}
                    updateBox={updateJailBox}
                    isMyTurn={isMyTurn}
                    colorOfTheUser={color}
                />
                <RollDice seconds={seconds} quitGame={quitGame} endTurn={endTurn} rolledOnce={rolledOnce} enemyRoll={enemyRoll} socket={socket} isMyTurn={isMyTurn} />
            </div>
            <PiecesBox socket={socket} pieces={whiteBox} updateBox={updateWhiteBox} />

        </DndProvider>
    )
}

export default Game
