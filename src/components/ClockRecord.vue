<template>
  <h3 class="mt-5">打卡日期: {{ date }}</h3>
  <div id="clock-record">
    <div class="row">
      <div class="col-sm-6 mb-3 mb-sm-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Clock-In</h5>
            <p
              class="card-text"
              ref="recordToday.clockIn"
            >{{ computedOutput.clockIn }}</p>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Clock-Out</h5>
            <p class="card-text">{{ computedOutput.clockOut }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-3 ms-1 ps-2">
    <n-button
      v-if="isAllowed"
      strong
      secondary
      type="info"
      class="clock-button"
      @click="punchClock"
    >
      {{ computedOutput.clockButtonText }}
    </n-button>

    <n-button
      v-else
      strong
      secondary
      type="info"
      class="clock-button"
      @click="props.getPosition"
    >
      {{ computedOutput.locateButtonText }}
    </n-button>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { NButton } from 'naive-ui'

import usersAPI from '../apis/users'
import { popErrMsg } from '../utils/swal'
import dateHelpers from '../utils/dateHelpers'

const props = defineProps({
  getPosition: {
    type: Function,
    default: () => ({})
  },
  isAllowed: {
    type: Boolean,
    default: false,
  }
})

const date = ref('YYYY-MM-DD')
const recordToday = reactive({
  clockIn: null,
  clockOut: null,
  recordId: null,
  status: 0
})

const computedOutput = computed(() => {
  const output = {
    clockIn: recordToday.clockIn === null ? '還沒打卡喔!' : formatTime(recordToday.clockIn),
    clockOut: recordToday.clockOut === null ? '還沒打卡喔!' : formatTime(recordToday.clockOut),
    clockButtonText: recordToday.status === 0 ? '打卡!' : '打卡! (可以下班囉~)',
    locateButtonText: recordToday.status === 0 ? '重新取得定位!' : '重新取得定位! (可以下班囉~)',
  }
  return output
})

function formatTime (recordTime) {
  return dateHelpers.formatTime(recordTime)
}

function getTodayDate () {
  return date.value = dateHelpers.getRecordDate()
}

function punchClock () {
  if (recordToday.clockIn === null) {
    return addNewRecord()
  }
  return updateRecord()
}

async function fetchTodayRecord () {
  try {
    const { data: { records, status, message } } = await usersAPI.getUserRecord({
      dateQuery: `?date=${date.value}`,
    })

    if (status === 'error') {
      return popErrMsg(message)
    }

    if (records) {
      recordToday.recordId = records.id
      recordToday.status = records.status
      recordToday.clockIn = records.clockIn
      recordToday.clockOut = records.clockOut
    }
    return
  } catch (err) {
    console.log(err)
  }
}

async function addNewRecord () {
  try {
    const { data: { records, status, message } } = await usersAPI.postUserRecord()

    if (status === 'error') {
      return popErrMsg(message)
    }
    if (records) {
      recordToday.recordId = records.id
      recordToday.clockIn = records.clockIn
    }
    return
  } catch (err) {
    console.log(err)
  }
}

async function updateRecord () {
  try {
    const { data: { records, status, message } } = await usersAPI.updateUserRecord({
      recordId: recordToday.recordId,
    })

    date.value = getTodayDate()

    if (status === 'error') {
      return popErrMsg(message)
    }

    if (records) {
      recordToday.status = records.status
      recordToday.clockOut = records.clockOut
    }
    return
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  getTodayDate()
  fetchTodayRecord()
})



</script>
<style>
.clock-button {
  font-size: large;
  height: 50px;
}
</style>
