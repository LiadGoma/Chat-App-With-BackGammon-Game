import axios from 'axios';
import jwtDecode from 'jwt-decode';

const url = "https://chat-app-backgammon.herokuapp.com/api/auth";

export async function login(email, password) {
    const { data: jwt } = await axios.post(url, {
        email, password
    });
    localStorage.setItem("token", jwt);
}
export function logout() {
    localStorage.removeItem('token');
}
export function logInWithJwt(jwt) {
    localStorage.setItem('token',jwt);
}
export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem("token");
        const user = jwtDecode(jwt);
        return user;
    } catch (ex) {
        return null;
    }

}
export default {
    login,
    logout,
    getCurrentUser,
    logInWithJwt
};