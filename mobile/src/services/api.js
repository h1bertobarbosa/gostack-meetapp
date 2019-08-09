import axios from 'axios';
// 192.168.0.104 - casa
// 192.168.100.11 = iw
// genymotion 10.0.3.2
const api = axios.create({
  baseURL: 'http://192.168.100.11:3333',
});

export default api;
