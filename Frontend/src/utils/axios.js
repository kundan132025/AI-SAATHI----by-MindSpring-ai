import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // <-- point to your backend API
  withCredentials: true, // if you use cookies/sessions
});

export default instance;
