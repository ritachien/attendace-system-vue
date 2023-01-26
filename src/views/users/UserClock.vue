<template>
  <RouterView
    :date="date"
    :recordToday="recordToday"
    @updateClockIn="clockInEmit"
    @updateClockOut="clockOutEmit"
    @reFetchRecord="reFetchRecordEmet"
  />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { RouterView } from 'vue-router'

import { popErrMsg } from '../../utils/swal'
import dateHelpers from '../../utils/dateHelpers'
import usersAPI from '../../apis/users'

const date = ref('YYYY-MM-DD')
const recordToday = reactive({
  clockIn: null,
  clockOut: null,
  recordId: null,
  status: 0
})

function clockInEmit (data) {
  recordToday.recordId = data.recordId
  recordToday.clockIn = data.clockIn
}

function clockOutEmit (data) {
  recordToday.status = data.status
  recordToday.clockOut = data.clockOut
}

function reFetchRecordEmet () {
  fetchTodayRecord()
}

function getTodayDate () {
  return date.value = dateHelpers.getRecordDate()
}

async function fetchTodayRecord () {
  try {
    getTodayDate()
    const { data: { records, status, message } } = await usersAPI.getUserRecord({
      dateQuery: `?date=${date.value}`,
    })
    if (status === 'error') throw new Error(message)
    if (records) {
      recordToday.recordId = records.id
      recordToday.status = records.status
      recordToday.clockIn = records.clockIn
      recordToday.clockOut = records.clockOut
    }
    return
  } catch (err) {
    popErrMsg(err)
  }
}

onMounted(async () => {
  fetchTodayRecord()
})
</script>
