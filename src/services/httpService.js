import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

//below line (if commented) is because bi-directional dependency occurring
//axios.defaults.headers.common["x-auth-token"] = auth.getJwt();

const interceptors = axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
        logger.log(error);
        toast.error("An unexpected error occurred.");
    }
    return Promise.reject(error);
});

//making this function to avoid bi-directional dependencies between http and auth module
export function setJwt(jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt,
};

export default http;

logger.withProfiler(interceptors);