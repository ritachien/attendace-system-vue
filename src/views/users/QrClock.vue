<template>
  <!-- 顯示當日打卡紀錄 -->
  <ClockRecord
    :date="date"
    :recordToday="recordToday"
    :isGpsRoute="false"
  />

  <!-- scanner -->
  <QrReader @updateQrString="punchQrClock" />


</template>

<script setup>
import { ref } from "vue"

import QrReader from '../../components/QrReader.vue'
import ClockRecord from '../../components/ClockRecord.vue'
import usersAPI from '../../apis/users'
import dateHelpers from '../../utils/dateHelpers'
import { popErrMsg } from '../../utils/swal'

const qrString = ref('')
const props = defineProps({
  date: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  recordToday: {
    type: Object,
    default: () => ({
      clockIn: {
        type: String,
        default: null,
      },
      clockOut: {
        type: String,
        default: null,
      },
      recordId: {
        type: Number,
        default: null,
      },
      status: {
        type: Number,
        default: 0,
      },
    }),
  }
})
const emit = defineEmits(['updateClockIn', 'updateClockOut', 'reFetchRecord'])

function punchQrClock (data) {
  qrString.value = data
  punchClock()
}
/*
  ====================== 打卡用 =======================
*/
function punchClock () {
  if (props.date !== dateHelpers.getRecordDate()) {
    emit('reFetchRecord', null)
  }
  if (props.recordToday.clockIn === null) {
    return addNewRecord()
  }
  return updateRecord()
}

async function addNewRecord () {
  try {
    const { data: { records, status, message } } = await usersAPI.postUserRecord({
      qrString: qrString.value,
    })
    if (status === 'error') throw new Error(message)
    if (records) {
      emit('updateClockIn', {
        recordId: records.id,
        clockIn: records.clockIn,
      })
    }
    return
  } catch (err) {
    popErrMsg(err)
  }
}

async function updateRecord () {
  try {
    const { data: { records, status, message } } = await usersAPI.updateUserRecord({
      recordId: props.recordToday.recordId,
      qrString: qrString.value,
    })
    if (status === 'error') throw new Error(message)
    if (records) {
      emit('updateClockOut', {
        status: records.status,
        clockOut: records.clockOut,
      })
    }
    return
  } catch (err) {
    popErrMsg(err)
  }
}
</script>
