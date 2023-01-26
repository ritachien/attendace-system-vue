<template>
  <n-card
    class="card"
    size="small"
    bordered
    :embedded="true"
  >
    {{ props.time }}
  </n-card>
</template>

<script setup>
import { NCard } from 'naive-ui'

const props = defineProps({
  time: {
    type: String,
    default: null,
  }
})
</script>

<style scoped>
.card {
  min-width: 150px;
  background-color: #fae3d9;
  border: 1px solid #ffb6b9;
}
</style>
