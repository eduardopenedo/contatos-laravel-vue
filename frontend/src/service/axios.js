import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // Ajuste a URL da API conforme necessário
});


export default instance;
