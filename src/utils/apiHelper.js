import axios from 'axios'

const baseURL = 'http://localhost:3000/api'

export const apiHelper = axios.create({
  baseURL,
  validateStatus: function (status) {
    return status >= 200 && status < 500
  }
})
