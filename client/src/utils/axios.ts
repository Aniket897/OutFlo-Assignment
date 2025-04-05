import axios from "axios";

const SERVER_URL = 'http://localhost:8080';

export default axios.create({
  baseURL: SERVER_URL,
});
