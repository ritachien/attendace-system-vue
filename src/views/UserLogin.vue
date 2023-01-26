<template>
  <main>
    <h1>Login</h1>
    <n-form
      :model="userData"
      @submit.prevent.stop="handleSubmit"
    >

      <!-- 帳號 -->
      <InputItem
        label="Account"
        field="account"
        type="text"
        @updateInput="dataEmit"
        :value="userData.account"
        :required="formRequired.account"
        :isValidInput="isValidAccount"
        placeholder="Enter your account here..."
        :key="`account${submitTimes}`"
      />

      <!-- 密碼 -->
      <InputItem
        label="Password"
        field="password"
        type="password"
        @updateInput="dataEmit"
        :value="userData.password"
        :required="formRequired.password"
        :isValidInput="isValidPassword"
        placeholder="Enter your password here..."
        :key="`password${submitTimes}`"
      />

      <!-- admin checkbox -->
      <CheckBox
        labelText="Login as Admin"
        field="isAdmin"
        :value="userData.isAdmin"
        @updateInput="dataEmit"
        class="checkbox-item"
      />

      <!-- Submit button -->
      <SubmitButton
        :disabled="isProcessing"
        :clickEvent="handleSubmit"
        :loading="isProcessing"
        buttonText="Login"
      />

    </n-form>
  </main>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NForm } from 'naive-ui'

import InputItem from '../components/formItems/InputItem.vue'
import CheckBox from '../components/formItems/CheckBox.vue'
import SubmitButton from '../components/formItems/SubmitButton.vue'

import { useInputValidation } from '../composable/useInputValidation'

import authorizationAPI from '../apis/authorization'
import { popErrMsg, popOkMsg } from '../utils/swal'
import { useCurrentUserStore } from '../stores/currentUser'

const router = useRouter()
const userStore = useCurrentUserStore()
const isProcessing = ref(false)
const submitTimes = ref(0)
const userData = reactive({
  account: null,
  password: null,
  isAdmin: false,
})

// Input validation
const formRequired = reactive({
  account: true,
  password: true,
})
const isValidAccount = computed(() => useInputValidation({
  field: 'account',
  data: userData.account,
  required: formRequired.account,
}))
const isValidPassword = computed(() => useInputValidation({
  field: 'password',
  data: userData.password,
  required: formRequired.password,
}))

// Update emit datas
function dataEmit ({ field, data }) {
  if (data === undefined) return
  return userData[field] = !data ? null : data
}

// form submit
async function handleSubmit () {
  if (!isValidAccount.value || !isValidPassword.value) {
    return popErrMsg('請輸入正確格式的 account 和 password')
  }

  try {
    // 請求處理未完成時 disable submit button
    isProcessing.value = true

    // 針對不同身分發出不同 API 請求
    let response
    if (userData.isAdmin) {
      response = await authorizationAPI.adminLogin(userData)
    } else {
      response = await authorizationAPI.userLogin(userData)
    }

    // 處理 API 請求結果並提示相關訊息
    const { status, message, token, user } = response.data

    if (status === 'error') throw new Error(message)

    popOkMsg(message)

    // 將 Token 存入 localStorage    
    localStorage.setItem('token', token)

    // 更新 pinia store
    userStore.isAuthenticated = true
    userStore.setCurrentUser(user)

    // 依登入身分重新導入頁面
    if (userData.isAdmin) return router.push('/admin')
    return router.push('/user')

  } catch (err) {
    userData.password = null
    submitTimes.value++ // 清空密碼後，重新渲染 passwordInput
    popErrMsg(err.message)
  } finally {
    isProcessing.value = false
  }
}

</script>

<style scoped>
main {
  margin: 20px auto;
  padding: 20px;
  min-width: 350px;
  max-width: 600px;
}

h1 {
  text-align: center;
}

.checkbox-item {
  margin-top: 0;
}
</style>
