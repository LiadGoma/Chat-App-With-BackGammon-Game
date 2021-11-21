import "./Triangle.css";
import React, { useEffect, useState } from 'react'
import GamePiece from "../GamePiece/GamePiece";
import { useDrop } from "react-dnd";
import { movePiece } from "../../../services/gameService";

function Triangle({ socket, updateBoard, place, isTop, pieces, colorOfTheUser, isMyTurn }) {

    const [piecesArr, setPiecesArr] = useState([]);

    useEffect(() => {
        setPiecesArr(pieces);

    }, [])

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "div",
        drop: (item) => {
            addPiece(item);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),

    }));
    const addPiece = (item) => {
        movePiece(item.id, place, true);
        updateBoard();
        socket.current.emit("movePiece", localStorage.getItem("roomName"), item.id, place, isMyTurn);
    }
    return (
        <div className="column" ref={drop}>
            <div className={`pieces ${isTop?"top":"bottom"}`} >
                {piecesArr.map((piece) => {

                    return <GamePiece  isMyTurn={isMyTurn} colorOfTheUser={colorOfTheUser} piece={piece} />
                })}
            </div>
            <div className={isTop ? "triangleTop" : "triangleBottom"}>
            </div>
        </div>


    )
}

export default Triangle
