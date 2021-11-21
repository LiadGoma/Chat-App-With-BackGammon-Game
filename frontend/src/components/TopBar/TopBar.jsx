import React from 'react'
import { NavLink } from 'react-router-dom'
import "./TopBar.css"
function TopBar({userName}) {
    return (
        <div className="topBar">
            <div className="appName">Chat App</div>
            <div className="welcomeText"> {`hello ${userName}  how are you today`}</div>
            <NavLink className="logOutLink" to="/logout">
                LogOut
            </NavLink>
        </div>
    )
}

export default TopBar
