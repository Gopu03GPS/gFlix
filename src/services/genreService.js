import http from "./httpService";

const genreEndPoint = "/auth";

export function getGenres() {
    return http.get(genreEndPoint);
}
