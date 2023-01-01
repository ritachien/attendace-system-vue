<template>
  <h3 class="mt-5">打卡日期: {{ date }}</h3>
  <div id="clock-record">
    <div class="row">
      <div class="col-sm-6 mb-3 mb-sm-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Clock-In</h5>
            <p class="card-text" ref="recordToday.clockIn">{{ recordToday.clockIn }}</p>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Clock-Out</h5>
            <p class="card-text">{{ recordToday.clockOut }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-3 px-3">
    <n-button strong secondary type="info" class="clock-button">
      打卡
    </n-button>
  </div>
</template>
<script setup>
// import dayjs from 'dayjs'
import { ref, reactive, onMounted } from 'vue'
import { NButton } from 'naive-ui'

import usersAPI from '../apis/users'
import dateHelpers from '../utils/dateHelpers'
import { useCurrentUserStore } from '../stores/currentUser'

const userStore = useCurrentUserStore()

const date = ref('YYYY-MM-DD')
const recordToday = reactive({
  clockIn: '還沒打卡喔!',
  clockOut: '還沒打卡喔!'
})

function formatTime (recordTime) {
  return recordTime === '還沒打卡喔!'
    ? '還沒打卡喔!'
    : dateHelpers.formatTime(recordTime)
}

function getTodayDate () {
  date.value = dateHelpers.getRecordDate()
}

async function fetchTodayRecord () {
  const { data } = await usersAPI.getUserRecord({
    userId: userStore.currentUser.id,
    dateQuery: `?date=${date.value}`,
  })
  recordToday.clockIn = formatTime(data.records.clockIn)
  recordToday.clockOut = formatTime(data.records.clockOut)
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
