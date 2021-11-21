import "./HomePage.css";
import React, { useState, useEffect, useRef } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";
import auth from "../../services/authService";
import ContactsPanel from "../ContactsPanel/ContactsPanel";
import ChatArea from "../ChatArea/ChatArea";
import TopBar from "../TopBar/TopBar";
import { io } from "socket.io-client";
import Modal from "../Modal/Modal";
import Game from "../gameComponents/Game/Game";


function HomePage(props) {
    const [currentUser, setCurrentUser] = useState(null);
    const [otherUser, setOtherUser] = useState(null);
    const [onlineUsers, setOnlineUser] = useState([]);
    const [newMessageRecieved, setNewMessageRecieved] = useState(null);
    const [openModalReciever, setOpenModalReciever] = useState(false);
    const [openModalSender, setOpenModalSender] = useState(false);
    const [gameSender, setGameSender] = useState("");
    const [gameRoomName, setGameRoomName] = useState("");


    const socket = useRef();

    useEffect(() => {
        const curUser = auth.getCurrentUser();
        setCurrentUser(curUser);
    }, [])

    useEffect(() => {
        socket.current = io("https://chat-app-backgammon-server.herokuapp.com");
        socket.current.on("getMessage", (data) => {
            const newMsg = {
                members: [data.senderId, data.recieverId],
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now()
            }
            setNewMessageRecieved(newMsg);

        })
        socket.current.on("invitedToGame", (data) => {
            setGameSender(data.senderId);
            setGameRoomName(data.roomName);
            setOpenModalReciever(true);
            localStorage.setItem("userColor", "black");
        })
        socket.current.on("startGame", (roomName) => {
            setOpenModalSender(false);
            console.log(otherUser);
            localStorage.setItem("roomName", roomName);
            props.history.replace("/game");
        })
    }, [])

    useEffect(() => {
        socket.current.emit("addUser", currentUser?.id);
        socket.current.on("getUsers", users => {
            const userss =
                users.map((user) => {
                    return user.userId;
                });
            setOnlineUser(userss);
        });
    }, [currentUser])

    const acceptGame = () => {
        setOpenModalReciever(false);
        socket.current.emit("playerAcceptedGame", gameRoomName);
    }


    const checkForUser = () => {
        const user = auth.getCurrentUser();
        if (user) return true;
    }
    const changeChat = (otherUserr) => {
        console.log(otherUserr)
        setOtherUser(otherUser => { return otherUserr });
        props.history.replace("/chat");
    }

    const sendMessageWithSocket = (recieverId, text) => {
        socket.current.emit("sendMessage", currentUser.id, recieverId, text);
    }

    const inviteFriendToGame = (recieverId, senderId) => {
        localStorage.setItem("userColor", "white");
        console.log(otherUser)
        socket.current.emit("inviteToGame", recieverId, senderId);
        setOpenModalSender(true);
    }

    return (
        <div>
            {!checkForUser() ? <Redirect to="/login" /> :
                <div>
                    <TopBar userName={currentUser?.name} />

                    <div className="messanger">
                        <Switch>
                            <Route path="/chat" render={(props) => {
                                return <div className="contactsPanel">
                                    <div className="contactsPanelWrapper"><ContactsPanel
                                        currentUser={currentUser} userClick={changeChat}
                                        onlineUsers={onlineUsers} /></div>
                                </div>
                            }} />
                            <Route path="/game" render={(props) => {
                                return <ChatArea
                                    handleSocketMessage={sendMessageWithSocket} friend={otherUser}
                                    inviteFriendToGame={inviteFriendToGame}
                                    newMessageRecieved={newMessageRecieved}
                                    {...props} />
                            }} />
                            <Route path="/" render={(props) => {
                                return <div className="contactsPanel">
                                    <div className="contactsPanelWrapper"><ContactsPanel
                                        currentUser={currentUser} userClick={changeChat}
                                        onlineUsers={onlineUsers} /></div>
                                </div>
                            }} />
                        </Switch>

                        <div className="chatArea">
                            <div className="chatAreaWrapper">
                                <Switch>
                                    <Route path="/chat" render={(props) => {
                                        return <ChatArea
                                            handleSocketMessage={sendMessageWithSocket} friend={otherUser}
                                            inviteFriendToGame={inviteFriendToGame}
                                            newMessageRecieved={newMessageRecieved}
                                            {...props} />

                                    }} />
                                    <Route path="/game" render={(props) => {
                                        return <div className="gameArea">
                                            <div >
                                                <Game {...props} />
                                            </div>

                                        </div>
                                    }} />
                                </Switch>
                            </div>
                        </div>
                    </div>


                </div>
            }
            <Modal text={<div><div style={{ marginBottom: "20px" }}>waiting for your friend...</div><i class="fas fa-circle-notch fa-spin"> </i></div>} open={openModalSender} />
            <Modal text={`${gameSender} invited you to a game`} open={openModalReciever} acceptMethod={acceptGame}
                rejectMethod={() => console.log("reject")} />

        </div>
    )
}

export default HomePage
