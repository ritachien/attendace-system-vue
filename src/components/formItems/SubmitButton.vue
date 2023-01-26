<template>
  <n-button
    strong
    secondary
    block
    size="large"
    type="info"
    class="submitButton"
    @click="props.clickEvent"
    attr-type="submit"
  >
    {{ props.buttonText }}
  </n-button>
</template>

<script setup>
import { NButton } from 'naive-ui'

const props = defineProps({
  clickEvent: {
    type: Function,
    default: () => {},
  },
  buttonText: {
    type: String,
    default: '',
  }
})
</script>

<style scoped>
.submitButton {
  margin-top: 2vh;
  font-size: large;
}
</style>
