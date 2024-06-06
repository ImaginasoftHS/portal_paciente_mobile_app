import axios from 'axios';
import { GetIdToken } from './awsAuth';

export const api = axios.create({
  baseURL: 'https://sandboxapiportalpaciente.imaginasoft.pt', 
});

export const hashClinic ="29dfb5be-b58f-421d-95fb-99101acfa712";
api.interceptors.request.use(
  async (config) => {
    const token = await GetIdToken(); // Substitua por como você obtém o token
    console.log(token);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);




