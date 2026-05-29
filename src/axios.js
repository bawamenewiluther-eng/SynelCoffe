import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://synelcoffebackend-production.up.railway.app',
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
})

export default instance