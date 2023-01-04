import axios from 'axios'

// const developmentURL = 'http://localhost:3000/api'
const productionURL = 'https://attendance-system-express-production.up.railway.app/api'

export const apiHelper = axios.create({
  baseURL: productionURL,
  validateStatus: function (status) {
    return status >= 200 && status < 500
  }
})
