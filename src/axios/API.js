import axios from "axios";

const API = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
  // headers: {'Content-Type': 'application/json', }
});

API.interceptors.request.use
(
    config =>
    {
        config.headers.authorization = localStorage.getItem('authJWT');
        return config;
    },
    error =>
    {
        Promise.reject(error);
    }
);
API.interceptors.response.use
(
    async response =>
    {
        // await new Promise(r => setTimeout(r, 10+Math.random()*5500));

        return response.data.values;
    },
    async error =>
    {
        // await new Promise(r => setTimeout(r, 10+Math.random()*5500));

        if (error.response) return {"error":{"status":error.response.data.status,"message":error.response.data.values}};
        return {"error":{"status":503,"message":"Network error"}};
    }
);

export default API