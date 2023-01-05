<template>
  <div class="container py-5">
    <form
      class="w-100"
      @submit.prevent.stop="handleSubmit"
    >
      <div class="text-center my-4">
        <h1 class="h3 mb-4 font-weight-normal">
          Login
        </h1>
      </div>

      <div class="form-label-group my-4">
        <label for="account">Account</label>
        <input
          id="account"
          v-model.trim="userData.account"
          name="account"
          type="text"
          class="form-control"
          placeholder="Enter account here..."
          required
          autofocus
        >
      </div>

      <div class="form-label-group my-4">
        <label for="password">Password</label>
        <input
          id="password"
          v-model.trim="userData.password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Enter password here..."
          autocomplete="current-password"
          required
        >
      </div>

      <div class="mb-4 form-check">
        <input
          type="checkbox"
          class="form-check-input"
          id="isAdmin"
          v-model="isAdmin"
        >
        <label
          class="form-check-label"
          for="isAdmin"
        >Login as Admin</label>
      </div>
      <div class="row mt-4 px-2">
        <n-button
          strong
          secondary
          type="info"
          class="clock-button"
          :disabled="isProcessing"
          @click="handleSubmit"
          attr-type="submit"
        >
          Login
        </n-button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { NButton } from 'naive-ui'

import router from '../router'
import authorizationAPI from '../apis/authorization'
import { Toast } from '../utils/swal'
import { useCurrentUserStore } from '../stores/currentUser'

const userStore = useCurrentUserStore()
const isAdmin = ref(false)
const isProcessing = ref(false)
const userData = reactive({
  account: '',
  password: '',
})

const handleSubmit = async () => {
  if (!userData.account || !userData.password) {
    return Toast.fire({
      icon: 'warning',
      title: '請輸入 account 和 password'
    })
  }

  try {
    // 請求處理未完成時 disable submit button
    isProcessing.value = true

    // 針對不同身分發出不同 API 請求
    let response
    if (isAdmin.value) {
      response = await authorizationAPI.adminLogin(userData)
    } else {
      response = await authorizationAPI.userLogin(userData)
    }

    // 處理 API 請求結果並提示相關訊息
    const { status, message, token, user } = response.data
    if (status === 'success') {
      Toast.fire({
        icon: 'success',
        title: message
      })


      // 將 Token 存入 localStorage    
      localStorage.setItem('token', token)

      // 更新 pinia store
      userStore.isAuthenticated = true
      userStore.setCurrentUser(user)

      // 依登入身分重新導入頁面
      if (isAdmin.value) return router.push('/admin')
      return router.push('/user')
    } else {
      isProcessing.value = false
      userData.password = ''
      Toast.fire({
        icon: 'warning',
        title: message
      })
    }
  } catch (err) {
    isProcessing.value = false
    return Toast.fire({
      icon: 'warning',
      title: err
    })
  }
}
</script>

<style scoped>
form {
  margin: 0 auto;
  max-width: 600px;
}
</style>
