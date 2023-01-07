import { apiHelper } from "../utils/apiHelper"

const getToken = () => localStorage.getItem('token')

export default {
  addUser (userData) {
    return apiHelper.post('/admin/users', { ...userData }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getQrString () {
    return apiHelper.get('/admin/qrcode', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}
