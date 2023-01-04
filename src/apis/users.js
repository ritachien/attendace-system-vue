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
  postUserRecord ({ clockIn }) {
    return apiHelper.post('/user/records', { clockIn }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  updateUserRecord ({ recordId, clockOut }) {
    return apiHelper.patch(`/user/records/${recordId}`, { clockOut }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  updateUser (userData) {
    return apiHelper.put('/user', userData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}
