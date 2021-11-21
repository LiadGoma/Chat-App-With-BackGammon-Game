import React from 'react'
import GamePiece from '../GamePiece/GamePiece';
import "./Jail.css";

function Jail({ pieces, updateBox, socket, isMyTurn, colorOfTheUser }) {
    return (
        <div className="jail">
            {pieces && pieces.map((piece) => {
                return <GamePiece colorOfTheUser={colorOfTheUser} piece={piece} isMyTurn={isMyTurn} />
            })}
        </div>
    )
}

export default Jail
