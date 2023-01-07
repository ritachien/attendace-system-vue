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
import { ref, onMounted, onUnmounted } from 'vue'
import QrcodeVue from 'qrcode.vue'
import { CronJob } from 'cron'

import adminAPI from '../../apis/admin.js'
import { popErrMsg } from '../../utils/swal'

const qrValue = ref('hr://random_string')
const size = ref(300)
const renewQrCode = new CronJob(
  '10 * * * * *',  // 固定執行時間
  getQrString(),  // 要做的事
  null,  // 完成之後要做的事
  false,  // 自動開始 cron
  'Asia/Taipei'  // 時區
)

async function getQrString () {
  try {
    const res = await adminAPI.getQrString()
    if (res.data.status === 'error') return popErrMsg(res.data.message)
    qrValue.value = `hr://${res.data.data}`
  } catch (err) {
    popErrMsg(err)
  }
}

onMounted(() => {
  renewQrCode.start()
  getQrString()
})

onUnmounted(() => {
  renewQrCode.stop()
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
