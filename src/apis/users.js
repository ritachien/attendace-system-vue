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
  postUserRecord () {
    return apiHelper.post('/user/records', {}, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  updateUserRecord ({ recordId }) {
    return apiHelper.patch(`/user/records/${recordId}`, {}, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  updateUser (userData) {
    return apiHelper.put('/user', userData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}
