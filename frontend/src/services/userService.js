import axios from 'axios';
const url = "https://chat-app-backgammon.herokuapp.com/api/users";

export function createUser(user) {
    console.log("let go");
    return axios.post(url, {
        email: user.email,
        password: user.password,
        name: user.name
    });
    // console.log(ex.data);
}



export function getUsers() {
    return axios.get(url);
}

