import { apiHelper } from "../utils/apiHelper"

const getToken = () => localStorage.getItem('token')

export default {
  getUserRecord ({ userId, dateQuery }) {
    return apiHelper.get(`/users/${userId}/records${dateQuery}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getCurrentUser () {
    return apiHelper.get(`/users/getCurrentUser`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  postUserRecord ({ clockIn }) {
    return apiHelper.post('/users/records', { clockIn }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  updateUserRecord ({ recordId, clockOut }) {
    return apiHelper.patch(`/users/records/${recordId}`, { clockOut }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
