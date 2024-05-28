import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:3500",
});

export default Api;
