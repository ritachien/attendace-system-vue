<template>
  <main>
    <h1>個人資料編輯</h1>

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
        :feedback="validationFeedback.account"
        :placeholder="currentUser.account"
        :key="`account${submitTimes}`"
      />

      <!-- Name -->
      <InputItem
        label="Name"
        field="name"
        type="text"
        :value="userData.name"
        :required="formRequired.name"
        :placeholder="currentUser.name"
        :disabled="true"
      />

      <!-- Email -->
      <InputItem
        label="Email"
        field="email"
        type="email"
        @updateInput="dataEmit"
        :value="userData.email"
        :required="formRequired.email"
        :isValidInput="isValidEmail"
        :feedback="validationFeedback.email"
        :placeholder="currentUser.email"
        :key="`email${submitTimes}`"
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
        :feedback="validationFeedback.password"
        placeholder="Enter password to set a new one..."
        :key="`password${submitTimes}`"
      />

      <!-- 確認密碼 -->
      <InputItem
        label="Confirm Password"
        field="passwordCheck"
        type="password"
        @updateInput="dataEmit"
        :value="userData.passwordCheck"
        :required="passwordCheckRequired"
        :passwordValue="userData.password"
        :feedback="validationFeedback.passwordCheck"
        placeholder="Enter new password again..."
        :key="`passwordCheck${submitTimes}`"
      />

      <SubmitButton
        :disabled="nothingUpdate || isProcessing"
        :clickEvent="handleSubmit"
        :loading="isProcessing"
        buttonText="Save"
      />

    </n-form>
  </main>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { NForm } from 'naive-ui'
import { storeToRefs } from 'pinia'

import InputItem from '../../components/formItems/InputItem.vue'
import SubmitButton from '../../components/formItems/SubmitButton.vue'

import { useInputValidation } from '../../composable/useInputValidation'
import { useCurrentUserStore } from '../../stores/currentUser'
import { popErrMsg, popOkMsg } from '../../utils/swal'
import userAPI from '../../apis/users'

// 取得 user 修改前資料
const userStore = useCurrentUserStore()
const { currentUser } = storeToRefs(userStore)
const isProcessing = ref(false)
const nothingUpdate = computed(() => {
  // 如果任一欄位 account、email、password 任一欄位有變動
  return userData.account || userData.email || userData.password
    ? false
    : true
})

// 紀錄本次改動內容
const submitTimes = ref(0)
const userData = reactive({
  account: null,
  email: null,
  password: null,
  passwordCheck: null,
})

// Input validation
const formRequired = reactive({
  account: false,
  email: false,
  password: false,
})
const passwordCheckRequired = computed(() => {
  return Boolean(userData.password)
})
const isValidAccount = computed(() => useInputValidation({
  field: 'account',
  data: userData.account,
  required: formRequired.account,
}))
const isValidEmail = computed(() => useInputValidation({
  field: 'email',
  data: userData.email,
  required: formRequired.email,
}))
const isValidPassword = computed(() => useInputValidation({
  field: 'password',
  data: userData.password,
  required: formRequired.password,
}))
const validationFeedback = reactive({
  account: null,
  password: null,
  passwordCheck: null,
  email: null,
})

// Update emit datas
function dataEmit ({ field, data }) {
  if (data === undefined) return
  return userData[field] = !data ? null : data
}

// 表單發送
async function handleSubmit () {
  try {
    // 請求處理未完成時 disable submit button
    let errors = false
    isProcessing.value = true

    // 檢查所有的 input
    if (!isValidAccount.value) {
      validationFeedback.account = '帳號須由 5~12 碼英數字組成!'
      errors = true
    }

    if (!isValidPassword.value) {
      validationFeedback.password = '密碼須由 6~20 碼英數字或符號(_!@#$%^&*)組成!'
      errors = true
    }

    if (userData.password !== userData.passwordCheck) {
      validationFeedback.passwordCheck = '輸入的兩次密碼必須相同!'
      errors = true
    }

    if (!isValidEmail.value) {
      validationFeedback.email = '請使用正確 email 格式!'
      errors = true
    }

    // 如果有任一錯誤，提示錯誤訊息並終止 submit
    if (errors) return isProcessing.value = false

    // 發出 API 請求
    const { data: { status, message, user } } = await userAPI.updateUser(userData)

    if (status === 'error') throw new Error(message)
    userStore.setCurrentUser(user)
    resetForm()
    popOkMsg('修改成功!')
  } catch (err) {
    popErrMsg(err)
  } finally {
    isProcessing.value = false
  }

  // 重設表單
  function resetForm () {
    // 重設更新內容
    userData.account = null
    userData.email = null
    userData.password = null
    userData.passwordCheck = null
    // 重設驗證訊息
    validationFeedback.account = null
    validationFeedback.email = null
    validationFeedback.password = null
    validationFeedback.passwordCheck = null
    // 重新渲染
    return submitTimes.value++
  }
}

</script>
<style scoped>
main {
  margin: 10vh auto;
  min-width: 350px;
  max-width: 600px;
}

h1 {
  text-align: center;
}

.button {
  margin-top: 5px;
}
</style>
