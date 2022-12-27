<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Login
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="account">Account</label>
        <input id="account" v-model.trim="userData.account" name="account" type="text" class="form-control"
          placeholder="Enter account here..." required autofocus>
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input id="password" v-model.trim="userData.password" name="password" type="password" class="form-control"
          placeholder="Enter password here..." autocomplete="current-password" required>
      </div>

      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="isAdmin" v-model="isAdmin">
        <label class="form-check-label" for="isAdmin">Login as Admin</label>
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

import authorizationAPI from '../apis/authorization'
import { Toast } from '../utils/swal'

const isAdmin = ref(false)
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
    // 針對不同身分發出不同 API 請求
    let response
    if (isAdmin.value) {
      response = await authorizationAPI.adminLogin(userData)
    } else {
      response = await authorizationAPI.userLogin(userData)
    }

    // 處理 API 請求結果並提示相關訊息
    const { status, message, token } = response.data
    if (status === 'success') {
      Toast.fire({
        icon: 'success',
        title: message
      })
    } else {
      userData.password = ''
      Toast.fire({
        icon: 'warning',
        title: message
      })
    }

    // 將 Token 存入 localStorage
    localStorage.setItem('token', token)
  } catch (err) {
    return Toast.fire({
      icon: 'warning',
      title: err
    })
  }
}
</script>
