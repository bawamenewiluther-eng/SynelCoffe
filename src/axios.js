import axios from 'axios';

const api = axios.create({
    // Ganti dengan URL Railway kamu
    baseURL: 'https://synelcoffebackend-production.up.railway.app',
    withCredentials: true, 
});

// Konfigurasi khusus untuk Laravel Sanctum
api.defaults.xsrfCookieName = 'XSRF-TOKEN';
api.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

// Opsional: Header agar Laravel mengenali request AJAX
api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
api.defaults.headers.common['Accept'] = 'application/json';

export default api;