import "./RollDice.css";
import React, { useEffect, useState } from 'react'
import Die from "../Die/Die";

function RollDice({ seconds, quitGame, endTurn, rolledOnce, enemyRoll, isMyTurn, socket }) {
    const [die1, setDie1] = useState("one");
    const [die2, setDie2] = useState("one");
    const [rolling, setRolling] = useState(false);

    useEffect(() => {
        console.log(isMyTurn, "in the dice");
    }, [isMyTurn])

    const sides = [
        { one: 1 },
        { two: 2 },
        { three: 3 },
        { four: 4 },
        { five: 5 },
        { six: 6 },
    ]

    const roll = () => {
        setRolling(true);
        const result1 = sides[Math.floor(Math.random() * sides.length)];
        const result2 = sides[Math.floor(Math.random() * sides.length)];
        setDie1(Object.keys(result1)[0]);
        setDie2(Object.keys(result2)[0]);
        const number1 = Object.values(result1)[0];
        const number2 = Object.values(result2)[0];
        localStorage.setItem("value1", number1);
        localStorage.setItem("value2", number2);
        if (localStorage.getItem("value1") === localStorage.getItem("value2")) {
            localStorage.setItem("value3", number1);
            localStorage.setItem("value4", number2);
        }
        socket.current.emit("rollDice", Object.values(result1)[0], Object.values(result2)[0], localStorage.getItem("roomName"));
        //  socket.current.on("enemyRolledDice", (data) => {
        //      console.log(data);
        //  })

        setTimeout(() => {
            setRolling(false);
        }, 1300)
    }
    // useState(() => {
    //     socket.current?.on("enemyRolledDice", (data) => {
    //         console.log(data);
    //     })
    // },[socket])

    return (
        <div className="roll-dice">
            <div className="dice-container">
                {enemyRoll && !isMyTurn ? <><Die face={Object.keys(sides[enemyRoll.number1 - 1])[0]} rolling={rolling} />
                    <Die face={Object.keys(sides[enemyRoll.number2 - 1])[0]} rolling={rolling} /></>
                    :
                    <> <Die face={die1} rolling={rolling} />
                        <Die face={die2} rolling={rolling} /></>}
            </div>
            {isMyTurn ?
                <div>
                    <button className="myBtn" onClick={roll} disabled={rolling || rolledOnce}>{rolling ? "Rolling..." : "Roll Dice"}</button>
                    <button className="myBtn end" onClick={endTurn}>End Turn</button>
                    <button className="myBtn quit" onClick={quitGame}>Quit Game</button>
                    <button className="myBtn seconds" disabled >{seconds}</button>
                </div>
                :
                <div>
                    <button className="myBtn" onClick={roll} disabled={true}>Not Your Turn</button>
                    <button className="myBtn quit" onClick={quitGame}>Quit Game</button>
                    <button className="myBtn seconds" disabled >{seconds}</button>
                </div>
            }
        </div>

    )

}


export default RollDice
