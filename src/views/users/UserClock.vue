<template>
  <!-- 顯示當日打卡紀錄 -->
  <div class="row mb-5">
    <ClockRecord
      :getPosition="getPosition"
      :isAllowed="isAllowedTOClock"
    />
  </div>

  <!-- 顯示當前定位地圖，綁定 key 強制重新渲染畫面 -->
  <div class="row">
    <GoogleMap
      :placesAllowToClock="placesAllowToClock"
      :currentPosition="currentPosition"
      :key="updateTimes"
    />
  </div>

</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { distanceTo } from 'geolocation-utils'

import GoogleMap from '../../components/GoogleMap.vue'
import ClockRecord from '../../components/ClockRecord.vue'
import { popErrMsg } from '../../utils/swal'

const currentPosition = {
  // 預設起始位置在台北市府轉運站
  lat: 25.041213072396634,
  lng: 121.56464015397673,
}

const placesAllowToClock = [
  {
    // 測試用
    lat: 25.135127138724254,
    lng: 121.77785037557382
  },
  {
    // 新加坡商鈦坦科技
    lat: 25.057640384418786,
    lng: 121.61235508426716
  },
  {
    // ALPHA Camp
    lat: 25.05599234479154,
    lng: 121.5443365400908,
  },
]

// 用這個數值來綁定 GoogleMap 元件 key，當數值變動則強制重新渲染地圖
const updateTimes = ref(0)
let isAllowedTOClock = false

// 用 Google geolocate API 取得目前經緯度
async function getPosition () {
  try {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY
    const { data } = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`, {})
    currentPosition.lat = data.location.lat
    currentPosition.lng = data.location.lng
    calculateDistance()
    return updateTimes.value += 1
  } catch (err) {
    return popErrMsg('請重新確認裝置定位功能是否開啟!')
  }
}

function calculateDistance () {
  const allowedDistance = 400  // 公尺
  for (const place of placesAllowToClock) {
    const distance = distanceTo(currentPosition, place)
    if (distance <= allowedDistance) {
      return isAllowedTOClock = true
    }
  }
  return
}

</script>
