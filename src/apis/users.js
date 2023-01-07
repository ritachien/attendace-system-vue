import { apiHelper } from "../utils/apiHelper"

const getToken = () => localStorage.getItem('token')

export default {
  getUserRecord ({ dateQuery }) {
    return apiHelper.get(`/user/records${dateQuery}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getCurrentUser () {
    return apiHelper.get(`/users/getCurrentUser`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  postUserRecord ({ position, qrString }) {
    return apiHelper.post('/user/records', {
      position,
      qrString
    }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  updateUserRecord ({ recordId, position, qrString }) {
    return apiHelper.patch(`/user/records/${recordId}`, {
      position,
      qrString
    }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  updateUser (userData) {
    return apiHelper.put('/user', userData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}
