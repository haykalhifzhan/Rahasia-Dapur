import axios from "axios";

// Instance axios untuk komunikasi ke backend
const API = axios.create({
  baseURL: "http://192.168.1.41:5000/api",
});

export default API;
