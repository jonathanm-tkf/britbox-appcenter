import Constants from '@src/config/Constants';
import axios from 'axios';

const api = axios.create({
  baseURL: `${Constants.api}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic YnJpdGJveHVzcjpyb3dhbkF0a2luc29uMTk5MCE=',
  },
});

export default api;
