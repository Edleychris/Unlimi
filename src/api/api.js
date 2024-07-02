import axios from "axios";

const api = axios.create({
    baseURL: "http://3.88.1.181:8000/",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
    },
});

api.interceptors.request.use((request) => {
    return request;
}, 
function (error) {
    return Promise.reject(error)
});

api.interceptors.response.use((response) => {
    return response;
},
function (error) {
    if(error?.response?.status === 400) {
        console.error(error)
    }
    return Promise.reject(error)
});

export default api;
