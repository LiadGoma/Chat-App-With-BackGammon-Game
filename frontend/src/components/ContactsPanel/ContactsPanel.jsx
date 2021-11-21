import React, { useState, useEffect } from 'react'
import Contact from '../Contact/Contact';
import "./ContactsPanel.css";
import { getUsers } from "../../services/userService";
import auth from '../../services/authService';
function ContactsPanel({ userClick, currentUser, onlineUsers }) {
    const [users, setUsers] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [offlineFriends, setOfflineFriends] = useState([]);



    useEffect(() => {
        const loadUsers = async () => {
            let { data } = await getUsers();
            data = data.filter((user) => user._id !== currentUser?.id);
            setUsers(data);
        }
        loadUsers();
    }, [currentUser])

    useEffect(() => {
        setOnlineFriends(users.filter(user => onlineUsers.includes(user._id)));

    }, [onlineUsers, users])
    useEffect(() => {
        const usersss = users.filter((user) => !onlineUsers.includes(user._id));
        setOfflineFriends(usersss);
    }, [users, onlineFriends])

    const switchChat = (clickedUser) => {
        userClick(clickedUser);
        userClick(clickedUser);
    }
    return (
        <div className="contacts">
            <input placeholder="search for users" className="chatMenuInput"></input>
            <div className="users">
                {onlineFriends?.map((user) => {
                    return  <Contact key={user.id} user={user} status="online" click={switchChat} />
                })}
            </div>
            <div>offline users</div>
            <div className="users">
                {offlineFriends?.map(user => {
                    return <Contact user={user} status="offline" click={switchChat} />
                })}
            </div>
            <div className="bottom">profile</div>

        </div>
    )
}

export default ContactsPanel
