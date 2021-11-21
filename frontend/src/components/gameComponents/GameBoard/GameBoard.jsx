import "./GameBoard.css";
import React, { useEffect, useState } from 'react'
import Triangle from "../Triangle/Triangle";
function GameBoard({ gameArray, updateBoard, colorOfTheUser, socket, isMyTurn }) {


    return (
        <div className="game">

            <div className="gameBoard">
                <div className="gameBoardTop">
                    {gameArray && gameArray.map((tri) => {
                        if (tri.place > 6 && tri.place < 13) {
                            return <Triangle
                                colorOfTheUser={colorOfTheUser} updateBoard={updateBoard}
                                place={tri.place} pieces={tri.pieces} isTop={true}
                                socket={socket} isMyTurn={isMyTurn}></Triangle>
                        }

                    })}
                    <div className="middleBar"></div>
                    {gameArray && gameArray.map((tri) => {
                        if (tri.place < 7) {
                            return <Triangle colorOfTheUser={colorOfTheUser}
                                updateBoard={updateBoard} place={tri.place} pieces={tri.pieces}
                                isTop={true} socket={socket} isMyTurn={isMyTurn}></Triangle>
                        }

                    })}
                </div>
                <div className="gameBoardBottom">
                    {gameArray && gameArray.map((tri) => {
                        if (tri.place > 12 && tri.place < 19)
                            return <Triangle colorOfTheUser={colorOfTheUser}
                                updateBoard={updateBoard} place={tri.place} pieces={tri.pieces}
                                isTop={false} socket={socket} isMyTurn={isMyTurn}></Triangle>
                    })}
                    <div className="middleBar"></div>
                    {gameArray && gameArray.map((tri) => {
                        if (tri.place > 18)
                            return <Triangle colorOfTheUser={colorOfTheUser}
                                updateBoard={updateBoard} place={tri.place} pieces={tri.pieces}
                                isTop={false} socket={socket} isMyTurn={isMyTurn}></Triangle>
                    })}

                </div>
            </div>


        </div>
    )
}

export default GameBoard
