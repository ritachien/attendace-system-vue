<template>
  <div
    class="loading-indicator"
    v-if="loading"
  >
    Loading...
  </div>
  <qrcode-stream
    class="scanner"
    :camera="cameraActive"
    @init="onInit"
    @decode="onDecode"
  />

  <br />
</template>


<script setup>
import { ref } from 'vue'
import { QrcodeStream } from "vue-qrcode-reader"

import { popErrMsg, popOkMsg } from '../utils/swal'

const emit = defineEmits(['updateQrString'])
const cameraActive = ref('auto')
const loading = ref(false)

function onDecode (decodedString) {
  pauseScan()
  const reg = /^hr:\/\/(?<string>[-\w]{36})$/
  const { string } = decodedString.match(reg).groups
  if (!string) {
    return popErrMsg('QRcode 解讀失敗，請更新 QRcode 後重新掃描一次!')
  }

  popOkMsg('掃描成功!')
  emit('updateQrString', string)
  return setTimeout(() => {
    startScan()
  }, 500)
}

function pauseScan () {
  loading.value = true
  cameraActive.value = 'off'
}
function startScan () {
  loading.value = false
  cameraActive.value = 'auto'
}

async function onInit (promise) {
  try {
    loading.value = true
    await promise
    loading.value = false
  } catch (error) {
    if (error.name === "NotAllowedError") {
      popErrMsg('請打開相機權限!')
    } else if (error.name === "NotFoundError") {
      popErrMsg('偵測不到您裝置上的相機!')
    } else if (error.name === "NotSupportedError") {
      popErrMsg('僅接受 HTTPS 或 localhost')
    } else if (error.name === "NotReadableError") {
      popErrMsg('請檢查相機是否被其他程式使用中!')
    } else if (error.name === "OverconstrainedError") {
      popErrMsg('請確認您的相機設置')
    } else if (error.name === "StreamApiNotSupportedError") {
      popErrMsg('不支援，請更換其他瀏覽器!')
    }
  }
}
</script>
<style scoped>
.loading-indicator {
  min-width: 330px;
  min-height: 330px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  line-height: 330px;
  color: #ffb6b9;
  background-color: #1F6ED4;
}

.scanner {
  min-width: 330px;
  max-width: 600px;
}
</style>
