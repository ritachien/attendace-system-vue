<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Login In
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="account">Account</label>
        <input id="account" v-model.trim="account" name="account" type="text" class="form-control"
          placeholder="Enter account here..." required autofocus>
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input id="password" v-model.trim="password" name="password" type="password" class="form-control"
          placeholder="Enter password here..." autocomplete="current-password" required>
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import authorizationAPI from '../apis/authorization'

const account = ref('')
const password = ref('')

const handleSubmit = async () => {
  const data = {
    account: account.value,
    password: password.value
  }

  const response = await authorizationAPI.userLogin(data)
  localStorage.setItem('token', response.data.token)
}
</script>
