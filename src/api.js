import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'https://synelcoffebackend-production.up.railway.app',
    withCredentials: true,
});

// Paksa Axios mengambil token dari cookie setiap kali melakukan request
api.interceptors.request.use((config) => {
    // 1. Coba ambil dari js-cookie
    let token = Cookies.get('XSRF-TOKEN');
    
    // 2. Jika gagal (karena cross-domain), coba cari manual di document.cookie
    if (!token) {
        const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
        if (match) token = match[1];
    }

    if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
    return config;

});

api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
api.defaults.headers.common['Accept'] = 'application/json';

export default api;