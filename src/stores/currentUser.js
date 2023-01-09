import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

import userAPI from '../apis/users'
import { popErrMsg } from '../utils/swal'

export const useCurrentUserStore = defineStore('currentUser', () => {
  const isAuthenticated = ref(false)
  const currentUser = reactive({
    id: '',
    name: '',
    account: '',
    email: '',
    isAdmin: false,
  })

  function setCurrentUser (user) {
    isAuthenticated.value = true
    currentUser.id = user.id
    currentUser.name = user.name
    currentUser.account = user.account
    currentUser.email = user.email
    currentUser.isAdmin = user.isAdmin
  }

  function revokeAuthentication () {
    isAuthenticated.value = false
    currentUser.id = ''
    currentUser.name = ''
    currentUser.account = ''
    currentUser.email = ''
    currentUser.isAdmin = false
  }

  async function fetchCurrentUser () {
    try {
      const { data: { user } } = await userAPI.getCurrentUser()
      if (user) return setCurrentUser(user)
    } catch (err) {
      popErrMsg(err)
    }
  }

  return {
    isAuthenticated,
    currentUser,
    setCurrentUser,
    revokeAuthentication,
    fetchCurrentUser,
  }
})
