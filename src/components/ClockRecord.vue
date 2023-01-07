<template>
  <h3 class="mt-5">打卡日期: {{ props.date }}</h3>
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

  <div
    class="row mt-3 ms-1 ps-2"
    v-if="props.isGpsRoute"
  >
    <n-button
      v-if="isAllowed"
      strong
      secondary
      type="info"
      class="clock-button"
      @click="props.punchClock"
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
import { computed } from 'vue'
import { NButton } from 'naive-ui'

import dateHelpers from '../utils/dateHelpers'

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
    })
  },
  getPosition: {
    type: Function,
    default: () => {}
  },
  punchClock: {
    type: Function,
    default: () => {}
  },
  isAllowed: {
    type: Boolean,
    default: false,
  },
  isGpsRoute: {
    type: Boolean,
    default: true,
  }
})

const computedOutput = computed(() => {
  const output = {
    clockIn: props.recordToday.clockIn === null ? '還沒打卡喔!' : formatTime(props.recordToday.clockIn),
    clockOut: props.recordToday.clockOut === null ? '還沒打卡喔!' : formatTime(props.recordToday.clockOut),
    clockButtonText: props.recordToday.status === 0 ? '打卡!' : '打卡! (可以下班囉~)',
    locateButtonText: props.recordToday.status === 0 ? '重新取得定位!' : '重新取得定位! (可以下班囉~)',
  }
  return output
})

function formatTime (recordTime) {
  return dateHelpers.formatTime(recordTime)
}
</script>
<style>
.clock-button {
  font-size: large;
  height: 50px;
}
</style>
