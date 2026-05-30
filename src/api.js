import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'https://synelcoffebackend-production.up.railway.app',
    withCredentials: true,
});

// Paksa Axios mengambil token dari cookie setiap kali melakukan request
api.interceptors.request.use((config) => {
    const token = Cookies.get('XSRF-TOKEN');
    if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
    return config;
});

api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
api.defaults.headers.common['Accept'] = 'application/json';

export default api;