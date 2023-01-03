<template>

  <n-layout has-sider class="admin-main">
    <!-- 左邊選單 -->
    <n-layout-sider bordered show-trigger collapse-mode="width" :collapsed-width="64" :width="240"
      :native-scrollbar="false">

      <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions"
        :default-expanded-keys="defaultExpandedKeys" />

    </n-layout-sider>
    <!-- 右邊內容 -->
    <n-layout-content content-style="padding: 24px;">
      <div class="page-content">
        <router-view />
      </div>
    </n-layout-content>
  </n-layout>


</template>

<script setup>
import { h } from "vue"
import { NLayout, NMenu, NLayoutSider, NLayoutContent, NIcon } from "naive-ui"
import { RouterLink } from 'vue-router'
import { UsersCog, UserPlus, Users } from '@vicons/fa'


function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const defaultExpandedKeys = ['user-management', 'record-management']
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
          default: () => '員工列表'
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
    key: "attendace-management",
    type: 'group',
    // icon: renderIcon(BookIcon),
    disabled: true,
    children: [
      {
        label: "Rat",
        key: "rat"
      },
    ]
  },
];

</script>

<style scoped>
.admin-main {
  margin-top: 2vh;
  height: 90vh;
}
</style>
