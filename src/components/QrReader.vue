<template>
  <qrcode-stream
    @init="onInit"
    @decode="onDecode"
  />
  <br />
</template>


<script setup>
import { QrcodeStream } from "vue-qrcode-reader"

import { popErrMsg } from '../utils/swal'

const emit = defineEmits(['updateQrString'])

function onDecode (decodedString) {
  const reg = /^hr:\/\/(?<string>[-\w]{36})$/
  const { string } = decodedString.match(reg).groups
  return emit('updateQrString', string)
}

async function onInit (promise) {
  try {
    await promise
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
