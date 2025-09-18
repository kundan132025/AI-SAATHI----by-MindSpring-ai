import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:5001",
});

export async function fetchStories(category = "all") {
  const res = await API.get("/api/stories", { params: { category } });
  return res.data;
}

export default API;
