import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sandboxapiportalpaciente.imaginasoft.pt', 
});

export const setAuthToken = async (username?: string, password?: string) => {
  const response = await api.post('/login', { username, password });
  return response.data;
};
