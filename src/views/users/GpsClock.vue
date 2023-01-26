<template>
  <main>
    <!-- 顯示當日打卡紀錄 -->
    <ClockRecord
      :date="date"
      :recordToday="recordToday"
      :getPosition="getPosition"
      :punchClock="punchClock"
      :isAllowed="isAllowedToClock"
      :isGpsRoute="true"
    />

    <!-- 顯示當前定位地圖，綁定 key 強制重新渲染畫面 -->
    <GoogleMap
      :placesAllowToClock="placesAllowToClock"
      :currentPosition="currentPosition"
      :key="updateTimes"
    />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { distanceTo } from 'geolocation-utils'

import GoogleMap from '../../components/GoogleMap.vue'
import ClockRecord from '../../components/ClockRecord.vue'
import { popErrMsg } from '../../utils/swal'
import usersAPI from '../../apis/users'
import dateHelpers from '../../utils/dateHelpers'

const isAllowedToClock = ref(false)
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
    getTodayDate: {
      type: Function,
      default: () => {},
    },
  }
})

const emit = defineEmits(['updateClockIn', 'updateClockOut', 'reFetchRecord'])

/*
  ================== For GPS usage ==================
*/
// 用這個數值來綁定 GoogleMap 元件 key，當數值變動則強制重新渲染地圖
const updateTimes = ref(0)
const currentPosition = {
  // 預設起始位置在台北市府轉運站
  lat: 25.041213072396634,
  lng: 121.56464015397673,
}
const placesAllowToClock = [
  {
    // 新加坡商鈦坦科技
    lat: 25.057640384418786,
    lng: 121.61235508426716,
  },
  {
    // ALPHA Camp
    lat: 25.05599234479154,
    lng: 121.5443365400908,
  },
  {
    // For testing
    lat: 25.05066242987015,
    lng: 121.53600488865158,
  }
]

// 用 Google geolocate API 取得目前經緯度
function getPosition () {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      currentPosition.lat = position.coords.latitude
      currentPosition.lng = position.coords.longitude
      calculateDistance()
      return updateTimes.value += 1
    },
    () => {
      popErrMsg('請確認是否開啟定位權限!')
    })
}

function calculateDistance () {
  const allowedDistance = 400  // 公尺
  for (const place of placesAllowToClock) {
    const distance = distanceTo(currentPosition, place)
    if (distance <= allowedDistance) {
      return isAllowedToClock.value = true
    }
  }
  return popErrMsg('您的定位地點距離可打卡地點超過 400 公尺!')
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
    const { data: { records, status, message } } = await usersAPI.postUserRecord({ position: currentPosition })
    if (status === 'error') throw new Error(message)
    if (records) {
      emit('updateClockIn', {
        recordId: records.id,
        clockIn: records.clockIn,
      })
    }
    return
  } catch (err) {
    popErrMsg(err.message)
  }
}

async function updateRecord () {
  try {
    const { data: { records, status, message } } = await usersAPI.updateUserRecord({
      recordId: props.recordToday.recordId,
      position: currentPosition,
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
    popErrMsg(err.message)
  }
}
</script>

<style scoped>

</style>
