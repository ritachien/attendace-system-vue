<template>
  <n-menu
    class="menu"
    v-model:value="activeKey"
    mode="horizontal"
    :options="menuOptions"
  />

</template>

<script setup>
import { h, ref } from "vue"
import { NMenu, NIcon } from "naive-ui"
import { RouterLink } from 'vue-router'
import { UsersCog, UserPlus, Users } from '@vicons/fa'

const activeKey = ref(null)
const menuOptions = [
  {
    label: "員工管理",
    key: "user-management",
    icon: renderIcon(UsersCog),
    children: [
      {
        label: () => h(
          RouterLink,
          {
            to: {
              name: 'user-list',
            }
          }, {
          default: () => '員工帳號管理'
        }),
        key: 'user-list',
        icon: renderIcon(Users),

      },
      {
        label: () => h(
          RouterLink,
          {
            to: {
              name: 'add-user',
            }
          }, {
          default: () => '新增員工帳號'
        }),
        key: 'add-user',
        icon: renderIcon(UserPlus),
      },
    ]
  },
  {
    label: "出勤管理",
    key: "attendance-management",
    icon: renderIcon(UsersCog),
    disabled: true,
    children: [
    ],
  },
]

function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

</script>

<style scoped>
.admin-main {
  margin-top: 2vh;
  height: 85vh;
}

.main-content {
  background-color: #f4f0e6;
}

.menu {
  width: 100vw;
  background-color: #FDFDEB;
}
</style>
