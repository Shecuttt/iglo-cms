import axios from "axios";

const Api = axios.create({
    baseURL: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
});

export default Api;
