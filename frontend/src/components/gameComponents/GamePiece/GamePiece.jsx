import "./GamePiece.css";
import React from 'react'
import { useDrag } from "react-dnd";

function GamePiece({isMyTurn, piece, colorOfTheUser }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "div",
        item: { id: piece },
        collect: (monitor) => ({

            isDragging: !!monitor.isDragging(),
        }),
    }));


    return (
        <div
            ref={colorOfTheUser === piece.color &&isMyTurn ? drag : null}
            className={`gamePiece ${piece.color}`}
            style={{ visibility: isDragging ? "hidden" : "visible" }}>

        </div>
    )
}

export default GamePiece
