import "./Die.css";
import React from 'react'

function Die({ face, rolling }) {
    return (

        <i className={`die fas fa-dice-${face} ${rolling && "shaking"}`} />
    )
}

export default Die
