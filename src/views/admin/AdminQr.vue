<template>
  <h2>點擊 QRcode 可以手動更新</h2>
  <QrGenerator />
</template>

<script setup>
import QrGenerator from '../../components/QrGenerator.vue'
</script>

<style scoped>
h2 {
  margin-top: 5vh;
  text-align: center;
}
</style>
