import axios from 'axios';
import { QueryClient } from 'react-query';
import { GetIdToken } from './awsAuth';

export const client = new QueryClient();
const api = axios.create({
  baseURL: 'https://sandboxapiportalpaciente.imaginasoft.pt', 
});

api.interceptors.request.use(
  (config) => {
    const token = GetIdToken(); // Substitua por como você obtém o token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const fetchUserData = async (user: Object) => {
  console.log(user);
  const response = await api.get('/getpatient', {
    
    params: {
      clinicNif: user["custom:clientNif"],
      patientNif: user["custom:ClientNif"],
      patientEmail: user.email

    },
  });
  return response.data;
};


