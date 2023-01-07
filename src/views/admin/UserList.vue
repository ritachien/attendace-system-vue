<template>
  <div class="container text-center">
    <table class="table table-striped table-hover table-light">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">姓名</th>
          <th scope="col">Email</th>
          <th scope="col">帳號狀態</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in userData"
          :key="user.id"
        >
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.errorTimes === 5 ? 'Locked' : 'OK' }}</td>
          <td>
            <button
              @click="unlockAccount(user.id)"
              class="btn btn-outline-danger mx-1"
              :disabled="user.errorTimes < 5"
            >帳號解鎖</button>
            <button
              @click="resetPassword(user.id)"
              class="btn btn-outline-success mx-1"
            >密碼重設</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import adminAPI from '../../apis/admin.js'
import { popErrMsg, popOkMsg } from '../../utils/swal'

const userData = ref([])

async function fetchUsers () {
  try {
    userData.value = []
    const { data: { status, message, users } } = await adminAPI.getUsers()
    if (status === 'error') return popErrMsg(message)
    return userData.value.push(...users)
  } catch (err) {
    console.log(err)
  }
}

async function resetPassword (userId) {
  try {
    const { data: { status, message } } = await adminAPI.editUser({
      userId,
      resetPassword: true,
    })
    fetchUsers()
    if (status === 'error') return popErrMsg(message)
    popOkMsg('密碼已重設為 titaner')
  } catch (err) {
    console.log(err)
  }
}

async function unlockAccount (userId) {
  try {
    const { data: { status, message } } = await adminAPI.editUser({
      userId,
      unlock: true,
    })
    fetchUsers()
    if (status === 'error') return popErrMsg(message)
    popOkMsg('帳號已解鎖')
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchUsers()
})

</script>
<style scoped>
table {
  max-width: 70vw;
  vertical-align: middle;
}
</style>
