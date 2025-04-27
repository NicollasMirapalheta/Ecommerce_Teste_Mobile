import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.8.11:3000/api', // Substitua pelo URL real da sua API
});
export const login = (email: string, password: string) => {
    const response = {
        data: {
          message: 'true',
        },
      };
    return response;
};
/*

export const login = (email: string, password: string) => {
    return api.post('/login', { email, password });
};

*/

export const register = (phoneNumber: string, email: string, password: string) => {
    return api.post('/register', { phoneNumber, email, password });
};

export default api;