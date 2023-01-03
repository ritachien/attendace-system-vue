<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center my-4">
        <h1 class="h3 mb-4 font-weight-normal">
          新增使用者
        </h1>
      </div>

      <div class="form-label-group my-4">
        <label for="account">Account</label>
        <input id="account" v-model.trim="userData.account" name="account" type="text" class="form-control"
          placeholder="使用者帳號" required autofocus>
      </div>

      <div class="form-label-group my-4">
        <label for="name">Name</label>
        <input id="name" v-model.trim="userData.name" placeholder="使用者姓名" name="name" type="text" class="form-control"
          required autofocus>
      </div>

      <div class="form-label-group my-4">
        <label for="email">Email</label>
        <input id="email" v-model.trim="userData.email" placeholder="使用者 email" name="email" type="email"
          class="form-control" autofocus>
      </div>

      <div class="form-label-group my-4">
        <label for="password">Password</label>
        <input id="password" name="password" type="text" class="form-control" placeholder="預設密碼: titaner" disabled>
      </div>

      <div class="row mt-5 px-3">
        <n-button strong secondary type="info" class="clock-button" @click="handleSubmit"
          :disabled="isNotReadyForSubmit || isProcessing">
          Submit
        </n-button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { NButton } from 'naive-ui'

import { popErrMsg, popConfirmMsg } from '../../utils/swal'
import adminAPI from '../../apis/admin'

// 紀錄本次改動內容
const userData = reactive({
  account: '',
  email: '',
  name: '',
})
const isProcessing = ref(false)
const isNotReadyForSubmit = computed(() => {
  // 如果任一欄位 account、email、password 任一欄位有變動
  return userData.account && userData.name
    ? false
    : true
})

// 表單發送
async function handleSubmit () {
  try {
    // 請求處理未完成時 disable submit button
    isProcessing.value = true

    // 檢查 user Input
    const accountReg = /^\w{6,12}$/
    const emailReg = /^[-\w.]+@([-\w]+\.)+[-\w]{2,4}$/
    const nameReg = /.{1,30}/

    if (!accountReg.test(userData.account)) {
      isProcessing.value = false
      return popErrMsg('帳號須由 6~12 碼英數字組成!')
    }

    if (!emailReg.test(userData.email)) {
      isProcessing.value = false
      return popErrMsg('請使用正確 email 格式!')
    }

    if (!nameReg.test(userData.name)) {
      isProcessing.value = false
      return popErrMsg('名字為必填，並介於 1~30 字間。')
    }

    // 發出 API 請求
    const { data: { status, message, user } } = await adminAPI.addUser(userData)

    if (status === 'error') {
      isProcessing.value = false
      return popErrMsg(message)
    }

    isProcessing.value = false
    return popConfirmMsg({
      icon: 'success',
      msg: '新建成功',
      contents: `
        <h5>帳號: ${user.account}\n</h5>
        <h5>密碼: titaner(預設)\n</h5>
        <h5>姓名: ${user.name}\n</h5>
        <h5>email: ${user.email}</h5>
      `
    })
  } catch (err) {
    isProcessing.value = false
    return popErrMsg(err)
  }
}

</script>


<style scoped>
form {
  margin: 0 auto;
  max-width: 600px;
}
</style>
