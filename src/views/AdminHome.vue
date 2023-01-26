<template>
  <!-- 選單 -->
  <AdminMenu />

  <main>
    <!-- 主內容 -->
    <router-view />
  </main>
</template>

<script setup>

import AdminMenu from '../components/AdminMenu.vue'
</script>

<style scoped>
main {
  margin: 0 auto;
  padding: 10px 20px;
}
</style>
