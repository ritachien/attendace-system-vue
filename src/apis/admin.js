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
  getUsers () {
    return apiHelper.get('/admin/users', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  editUser ({ userId, resetPassword, unlock }) {
    return apiHelper.put(`/admin/users/${userId}`, {
      resetPassword,
      unlock,
    }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
