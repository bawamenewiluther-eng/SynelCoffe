import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://synelcoffebackend-production.up.railway.app',
  withCredentials: true,
  withXSRFToken: true
})

export default instance