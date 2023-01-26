<template>
  <main>

    <h2 class="mt-5">打卡日期: {{ props.date }}</h2>

    <div id="clock-record">
      <RecordCard
        title="Clock-In"
        :time="computedOutput.clockIn"
      />
      <RecordCard
        title="Clock-Out"
        :time="computedOutput.clockOut"
      />
    </div>

    <div
      class="gpsButton"
      v-if="props.isGpsRoute"
    >
      <SubmitButton
        v-if="isAllowed"
        :buttonText="computedOutput.clockButtonText"
        :clickEvent="props.punchClock"
      />
      <SubmitButton
        v-else
        :buttonText="computedOutput.locateButtonText"
        :clickEvent="props.getPosition"
      />
    </div>
  </main>
</template>
<script setup>
import { computed } from 'vue'

import RecordCard from './RecordCard.vue'
import SubmitButton from './formItems/SubmitButton.vue'

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
    clockIn: props.recordToday.clockIn === null
      ? '還沒打卡喔!'
      : formatTime(props.recordToday.clockIn),
    clockOut: props.recordToday.clockOut === null
      ? '還沒打卡喔!'
      : formatTime(props.recordToday.clockOut),
    clockButtonText: props.recordToday.status === 0
      ? '打卡! (上班加油~)'
      : '打卡! (可以下班囉~)',
    locateButtonText: props.recordToday.status === 0
      ? '重新取得定位! (上班加油~)'
      : '重新取得定位! (可以下班囉~)',
  }
  return output
})

function formatTime (recordTime) {
  return dateHelpers.formatTime(recordTime)
}
</script>
<style scoped>
main {
  min-width: 330px;
  max-width: 600px;
  margin-top: 5vh;
  margin-bottom: 2vh;
}

#clock-record {
  display: flex;
}

.gpsButton {
  margin-top: 1vh;
}
</style>
