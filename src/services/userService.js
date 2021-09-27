import http from "./httpService";

const userEndPoint = "/users";

export function register(user) {
    return http.post(userEndPoint, {
        email: user.username,
        password: user.password,
        name: user.name,
    });
}
