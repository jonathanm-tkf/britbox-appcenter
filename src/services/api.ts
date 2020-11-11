import { Config } from '@src/utils/config';
import axios from 'axios';

const api = axios.create({
  baseURL: `${Config.API}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic YnJpdGJveHVzcjpyb3dhbkF0a2luc29uMTk5MCE=',
  },
});

export default api;
