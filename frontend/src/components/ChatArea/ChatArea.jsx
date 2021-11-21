import React, { useEffect, useState, useRef } from 'react';
import  { FowardMessage } from '../Message/Message';
import "./ChatArea.css";
import { getMessages, sendNewMessage } from "../../services/messageService";
import auth from "../../services/authService";

function ChatArea({ friend, handleSocketMessage, newMessageRecieved, inviteFriendToGame }) {
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    

    const lastMessageRef = useRef();

    useEffect(() => {
        const curUser = auth.getCurrentUser();
        setCurrentUser(curUser);
    }, [])

    useEffect(() => {
        setMessages([...messages, newMessageRecieved]);
    }, [newMessageRecieved])


    useEffect(() => {
        const getMessagesAsync = async () => {
            try {
                await getMessages(currentUser.id, friend._id).then((res) => {
                    setMessages([{ text: "" }, ...res.data]);
                }
                );
            } catch (ex) {
                console.log("failed");
            }

        }
        getMessagesAsync();
    }, [friend])

    const handleSendNewMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim().length > 0) {
            try {
                const { data } = await sendNewMessage(currentUser.id, friend._id, newMessage);
                if (messages.length === 0) {
                    setMessages(data);
                }
                else {
                    setMessages([...messages, data]);
                }
                handleSocketMessage(friend._id, newMessage);
                setNewMessage("");
            } catch (ex) {

            }
        }

    }
    const handleInviteToGame = () => {
        inviteFriendToGame(friend._id, currentUser.id);
    }


    return (
        <div className="chat">
            <div className="chatBoxTop">
                {messages.length > 1 ? <div>
                    {messages.map((msg, index) => {
                        const lastMessage = messages.length - 1 === index
                        return <FowardMessage text={msg?.text}
                            own={msg?.senderId === currentUser.id}
                            sentAt={msg?.createdAt}
                            ref={lastMessage ? lastMessageRef : null} />
                    })}</div> : <div>no messages</div>}



            </div>

            <div className="chatBoxBottom">

                <textarea className="chatMessageInput" placeholder="Write somthing..."
                    onChange={(e) => setNewMessage(e.target.value)} value={newMessage}
                    onKeyPress={(event) => event.key === "Enter" && handleSendNewMessage(event)}></textarea>
                <button className="chatSubmitButton" onClick={handleSendNewMessage}>Send</button>
                <button className="chatSubmitButton invite" disabled={!friend} onClick={handleInviteToGame}>Invite To Game</button>

            </div>
      
        </div>
    )
}

export default ChatArea
