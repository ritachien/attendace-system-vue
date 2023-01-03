import { apiHelper } from "../utils/apiHelper"

const getToken = () => localStorage.getItem('token')

export default {
  addUser (userData) {
    return apiHelper.post(`/admin/users`, { ...userData }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}
