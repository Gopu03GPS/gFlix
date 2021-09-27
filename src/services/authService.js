import jwtDecode from "jwt-decode";
import http from "./httpService";

const authEndPoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
    // after awaiting the promise response we have taken the responded json web token (jwt) from data and rename data as jwt
    const {data: jwt} = await http.post(authEndPoint, {email, password});
    // now let's store this in browser's local storage
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (error) {
        return null;
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

const auth = {
    login,
    loginWithJwt,
    getCurrentUser,
    getJwt,
    logout,
}

export default auth;