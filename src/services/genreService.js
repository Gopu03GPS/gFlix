import http from "./httpService";

const genreEndPoint = "/genres";

export function getGenres() {
    return http.get(genreEndPoint);
}
