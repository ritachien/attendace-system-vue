import { apiHelper } from '../utils/apiHelper'

export default {
  userLogin ({ account, password }) {
    return apiHelper.post('/users/login', {
      account,
      password,
    })
  },
  adminLogin ({ account, password }) {
    return apiHelper.post('/admin/login', {
      account,
      password,
    })
  },
}
