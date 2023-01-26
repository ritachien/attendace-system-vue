<template>
  <main>
    <qrcode-vue
      :value="qrValue"
      :size="size"
      level="H"
      @click="getQrString"
    />
  </main>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import QrcodeVue from 'qrcode.vue'

import adminAPI from '../apis/admin'
import { popErrMsg } from '../utils/swal'

const qrValue = ref('hr://random_string')
const size = ref(300)

async function getQrString () {
  try {
    const res = await adminAPI.getQrString()
    if (res.data.status === 'error') throw new Error(res.data.message)
    qrValue.value = `hr://${res.data.data}`
  } catch (err) {
    popErrMsg(err.message)
  }
}

let renewQrCode

onMounted(() => {
  getQrString()
  renewQrCode = setInterval(() => getQrString(), 60000) // 1 分鐘
})
onBeforeUnmount(() => {
  clearInterval(renewQrCode)
})
</script>

<style scoped>
main {
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  text-align: center;
}
</style>
