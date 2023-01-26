<template>
  <main>
    <h2>員工帳號清單</h2>
    <n-space
      vertical
      :size="12"
    >
      <n-data-table
        size="small"
        :columns="columns"
        :data="users"
        striped
      />
    </n-space>

  </main>
</template>

<script setup>
import { onMounted, ref, computed, h } from 'vue'
import { NDataTable, NSpace, NButton } from 'naive-ui'

import adminAPI from '../../apis/admin.js'
import { popErrMsg, popOkMsg } from '../../utils/swal'

const errorTimesToLocked = 5
const userData = ref([])
const titles = [
  { key: 'no', title: 'No.', align: 'center' },
  { key: 'name', title: '姓名' },
  { key: 'email', title: 'Email' },
  { key: 'accountStatus', title: '帳號狀態', align: 'center' },
]

const columns = createColumns()
const users = computed(() => {
  return userData.value.map((user, index) => {
    return ({
      no: index + 1,
      id: user.id,
      name: user.name,
      email: user.email,
      accountStatus: user.errorTimes >= errorTimesToLocked ? 'Locked' : 'OK'
    })
  })
})



async function fetchUsers () {
  try {
    const { data: { status, message, users } } = await adminAPI.getUsers()
    if (status === 'error') throw new Error(message)
    return userData.value = users
  } catch (err) {
    popErrMsg(err.message)
  }
}

function createColumns () {
  return [
    ...titles,
    {
      key: 'options',
      title: '操作選項',
      align: 'center',
      render (user) {
        return [
          h(NButton, {
            strong: true,
            tertiary: true,
            size: "small",
            type: 'success',
            onClick: () => resetPassword(user.id)
          },
            { default: () => "重設密碼" }
          ),
          h(NButton, {
            strong: true,
            tertiary: true,
            size: "small",
            type: 'error',
            disabled: user.accountStatus === 'OK',
            onClick: () => unlockAccount(user.id)
          },
            { default: () => "帳號解鎖" }
          ),
        ]
      },
    },
  ]
}

async function resetPassword (userId) {
  try {
    const { data: { status, message } } = await adminAPI.editUser({
      userId,
      resetPassword: true,
    })
    fetchUsers()
    if (status === 'error') throw new Error(message)
    popOkMsg('密碼已重設為 titaner')
  } catch (err) {
    popErrMsg(err.message)
  }
}

async function unlockAccount (userId) {
  try {
    const { data: { status, message } } = await adminAPI.editUser({
      userId,
      unlock: true,
    })
    if (status === 'error') throw new Error(message)
    await fetchUsers()
    popOkMsg('帳號已解鎖')
  } catch (err) {
    popErrMsg(err.message)
  }
}

onMounted(async () => {
  fetchUsers()
})

</script>
<style scoped>
main {
  margin: 5vh auto 0;
  max-width: 700px;
}

h2 {
  text-align: center;
}
</style>
