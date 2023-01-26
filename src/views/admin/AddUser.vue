<template>
  <main>
    <h1>新增使用者</h1>

    <n-form :model="userData">

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
        placeholder="Enter account here..."
        :key="`account${submitTimes}`"
      />

      <!-- Name -->
      <InputItem
        label="Name"
        field="name"
        type="text"
        @updateInput="dataEmit"
        :value="userData.name"
        :required="formRequired.name"
        :isValidInput="isValidName"
        :feedback="validationFeedback.name"
        placeholder="Enter name here..."
        :key="`name${submitTimes}`"
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
        placeholder="Enter email here..."
        :key="`email${submitTimes}`"
      />

      <!-- 密碼 -->
      <InputItem
        label="Password"
        field="password"
        type="password"
        placeholder="預設為 'titaner'"
        :disabled="true"
      />

      <SubmitButton
        :clickEvent="handleSubmit"
        :disabled="isInputAllFilled || isProcessing"
        :loading="isProcessing"
        buttonText="Save"
      />

    </n-form>
  </main>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { NForm } from 'naive-ui'

import InputItem from '../../components/formItems/InputItem.vue'
import SubmitButton from '../../components/formItems/SubmitButton.vue'

import { useInputValidation } from '../../composable/useInputValidation'
import { popErrMsg, popConfirmMsg } from '../../utils/swal'
import adminAPI from '../../apis/admin'

// 紀錄本次改動內容
const userData = reactive({
  account: null,
  email: null,
  name: null,
})
const submitTimes = ref(0)
const isProcessing = ref(false)
const isInputAllFilled = computed(() => {
  // 檢查所有欄位是否已填寫
  return userData.account && userData.name && userData.email
    ? false
    : true
})

// input validation
const formRequired = reactive({
  account: true,
  email: true,
  name: true,
})
const validationFeedback = reactive({
  account: null,
  name: null,
  email: null,
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
const isValidName = computed(() => useInputValidation({
  field: 'name',
  data: userData.name,
  required: formRequired.name,
}))

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

    if (!isValidEmail.value) {
      validationFeedback.email = '請使用正確 email 格式!'
      errors = true
    }

    if (!isValidName.value) {
      validationFeedback.name = '名字為必填，並介於 1~30 字間。'
      errors = true
    }

    // 如果有任一錯誤，提示錯誤訊息並終止 submit
    if (errors) return isProcessing.value = false

    // 發出 API 請求
    const { data: { status, message, user } } = await adminAPI.addUser(userData)

    if (status === 'error') throw new Error(message)

    resetForm()
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
    return popErrMsg(err)
  } finally {
    isProcessing.value = false
  }
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
</style>
