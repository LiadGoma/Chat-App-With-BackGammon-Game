import "./PiecesBox.css"
import React from 'react'
import { useDrop } from "react-dnd";
import gameService from "../../../services/gameService";
import GamePiece from "../GamePiece/GamePiece";

function PiecesBox({ pieces, updateBox,socket }) {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "div",
        drop: (item) => {
            addPieceToBox(item.id);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addPieceToBox = (item) => {
        gameService.addPieceToBox(item);
        socket.current.emit("addPieceToBox",item, localStorage.getItem("roomName"));
        updateBox();
    }

    return (
        <div>
            <div className="piecesBox" ref={drop}>

                {pieces && pieces.map((piece) => {
                    return <GamePiece piece={piece} />
                })}

            </div>
        </div>
    )
}

export default PiecesBox
