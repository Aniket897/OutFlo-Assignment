import axios from "axios";

const SERVER_URL = 'https://outflo-assignment-8ujw.onrender.com';

export default axios.create({
  baseURL: SERVER_URL,
});
