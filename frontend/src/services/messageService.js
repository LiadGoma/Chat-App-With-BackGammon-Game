import axios from 'axios';
const url = "https://chat-app-backgammon.herokuapp.com/api/messages";

export function sendNewMessage(senderId,recieverId,text) {
    return axios.post(url, {
        senderId: senderId,
        recieverId: recieverId,
        text: text
    });
}


export async function getMessages(senderId, recieverId) {
    const res =await axios.get(url + "/" + senderId + "/" + recieverId);
    return res;
}
