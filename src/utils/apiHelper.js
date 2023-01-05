import axios from 'axios'

const mode = import.meta.env.MODE
const baseURL = mode === 'production'
  ? 'https://attendance-system-express-production.up.railway.app/api'
  : 'http://localhost:3000/api'

export const apiHelper = axios.create({
  baseURL,
  validateStatus: function (status) {
    return status >= 200 && status < 500
  }
})
