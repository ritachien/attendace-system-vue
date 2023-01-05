import axios from 'axios'

// for dev use
// const baseURL = 'http://localhost:3000/api'

// for production use
const baseURL = 'https://attendance-system-express-production.up.railway.app/api'

export const apiHelper = axios.create({
  baseURL,
  validateStatus: function (status) {
    return status >= 200 && status < 500
  }
})
