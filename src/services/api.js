import axios from "axios";

const api = axios.create({
  baseURL: "https://kusterbox-backend.herokuapp.com"
});

export default api;
