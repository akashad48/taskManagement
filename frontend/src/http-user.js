import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:7072',
  headers: {
    'Content-Type': 'application/json',
  },
});