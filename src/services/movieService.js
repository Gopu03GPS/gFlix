import http from "./httpService";

const movieEndPoint = "/movies";

export function getMovies() {
    return http.get(movieEndPoint);
}

export function getMovie(movieId) {
    return http.get(`${movieEndPoint}/${movieId}`);
}

export function saveMovie(movie) {
    if (movie._id) {
        const movieBody = {...movie};
        // To avoid confusion between ID's, delete one id from body as RESFull API is also sending one id.
        delete movieBody._id;
        return http.put(`${movieEndPoint}/${movie._id}`, movieBody)
    }
    return http.post(movieEndPoint, movie);
}

export function deleteMovie(movieId) {
    return http.delete(movieEndPoint + "/" + movieId);
}
