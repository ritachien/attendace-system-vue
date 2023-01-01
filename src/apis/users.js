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
  }
}
