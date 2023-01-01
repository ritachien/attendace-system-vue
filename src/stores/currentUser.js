import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

import userAPI from '../apis/users'

export const useCurrentUserStore = defineStore('currentUser', () => {
  const isAuthenticated = ref(false)
  const currentUser = reactive({
    id: '',
    name: '',
    account: '',
    email: '',
    isAdmin: false,
  })

  function setCurrentUser (loginUser) {
    currentUser.id = loginUser.id
    currentUser.name = loginUser.name
    currentUser.account = loginUser.account
    currentUser.email = loginUser.email
    currentUser.isAdmin = loginUser.isAdmin
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
      setCurrentUser(user)
    } catch (err) {
      console.error('can not fetch user information')
      console.log(err)
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
