import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sandboxapiportalpaciente.imaginasoft.pt', 
});





export const setGetPatient = async (token:string,user:Object) => {
 // const response = await api.post('/login', { username, password });
  return {}//response.data;
};
