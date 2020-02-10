import axios from 'axios';

// baixe a api em NodeJS >> https://github.com/patricksegantine/lab-nodejs-rocketseat
const api = axios.create({
  baseURL: "http://localhost:3001/api"
});

export default api;