<template>
  <div class="container py-5">
    <form
      class="w-100"
      @submit.prevent.stop="handleSubmit"
    >
      <div class="text-center my-4">
        <h1 class="h3 mb-4 font-weight-normal">
          個人資料編輯
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
          :placeholder="currentUser.account"
          autofocus
        >
      </div>

      <div class="form-label-group my-4">
        <label for="name">Name</label>
        <input
          id="name"
          v-model.trim="userData.name"
          :placeholder="currentUser.name"
          name="name"
          type="text"
          class="form-control"
          disabled
        >
      </div>

      <div class="form-label-group my-4">
        <label for="email">Email</label>
        <input
          id="email"
          v-model.trim="userData.email"
          :placeholder="currentUser.email"
          name="email"
          type="email"
          class="form-control"
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
          placeholder="Enter password if you want to reset"
        >
      </div>

      <div class="form-label-group my-4">
        <label for="passwordCheck">Password Check</label>
        <input
          id="passwordCheck"
          v-model.trim="userData.passwordCheck"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Enter same password as above"
          :required="Boolean(userData.password)"
        >
      </div>
      <div class="row mt-4 px-2">
        <n-button
          strong
          secondary
          type="info"
          class="clock-button"
          :disabled="nothingUpdate || isProcessing"
          @click="handleSubmit"
          attr-type="submit"
        >
          Save
        </n-button>
      </div>

    </form>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { NButton } from 'naive-ui'

import { useCurrentUserStore } from '../../stores/currentUser'
import { popErrMsg, popOkMsg } from '../../utils/swal'
import userAPI from '../../apis/users'

// 取得 user 修改前資料
const userStore = useCurrentUserStore()
const { currentUser } = storeToRefs(userStore)

// 紀錄本次改動內容
const userData = reactive({
  account: '',
  email: '',
  password: '',
  passwordCheck: '',
})
const isProcessing = ref(false)
const nothingUpdate = computed(() => {
  // 如果任一欄位 account、email、password 任一欄位有變動
  return userData.account || userData.email || userData.password
    ? false
    : true
})

// 表單發送
async function handleSubmit () {
  try {
    // 請求處理未完成時 disable submit button
    isProcessing.value = true

    // 檢查 user Input
    const accountReg = /^\w{5,12}$/
    const emailReg = /^[-\w.]+@([-\w]+\.)+[-\w]{2,4}$/
    const passwordReg = /^[\w!@#$%^&*]{6,20}$/

    if (userData.password && !passwordReg.test(userData.password)) {
      isProcessing.value = false
      return popErrMsg('密碼須由 6~20 碼英數字或符號(_!@#$%^&*)組成!')
    }

    if (userData.password && userData.password !== userData.passwordCheck) {
      isProcessing.value = false
      return popErrMsg('輸入的兩次密碼必須相同!')
    }

    if (userData.account && !accountReg.test(userData.account)) {
      isProcessing.value = false
      return popErrMsg('帳號須由 6~12 碼英數字組成!')
    }

    if (userData.email && !emailReg.test(userData.email)) {
      isProcessing.value = false
      return popErrMsg('請使用正確 email 格式!')
    }

    // 發出 API 請求
    const { data: { status, message, user } } = await userAPI.updateUser(userData)

    if (status === 'error') {
      isProcessing.value = false
      return popErrMsg(message)
    }

    userStore.setCurrentUser(user)
    resetForm()
    isProcessing.value = false
    return popOkMsg('修改成功!')
  } catch (err) {
    isProcessing.value = false
    return popErrMsg(err)
  }

  // 重設表單
  function resetForm () {
    userData.account = ''
    userData.email = ''
    userData.password = ''
    userData.passwordCheck = ''
  }
}

</script>

