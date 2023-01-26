<template>
  <!-- 選單 -->
  <AdminMenu />

  <!-- 主內容 -->
  <router-view />
</template>

<script setup>

import AdminMenu from '../components/AdminMenu.vue'
</script>

<style scoped>
.admin-main {
  margin-top: 2vh;
  height: 85vh;
}

.main-content {
  background-color: #f4f0e6;
}
</style>
