<template>
  <h3 class="text-center mt-5">點擊 QRcode 可以更新</h3>
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

import adminAPI from '../../apis/admin.js'
import { popErrMsg } from '../../utils/swal'

const qrValue = ref('hr://random_string')
const size = ref(300)

async function getQrString () {
  try {
    const res = await adminAPI.getQrString()
    if (res.data.status === 'error') return popErrMsg(res.data.message)
    qrValue.value = `hr://${res.data.data}`
  } catch (err) {
    popErrMsg(err)
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
</style>
