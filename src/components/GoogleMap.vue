<template>
  <!-- 載入 Google Map -->
  <GoogleMap
    :api-key="API_KEY"
    style="width: 100%; height: 400px"
    :center="currentPosition"
    :zoom="15.8"
    :streetViewControl="mapOptions.streetViewControl"
    :fullscreen-control="mapOptions.fullscreenControl"
    :zoomControl="mapOptions.zoomControl"
    :mapTypeControl="mapOptions.mapTypeControl"
    :clickableIcons="mapOptions.clickableIcons"
    :gestureHandling="mapOptions.gestureHandling"
    :keyboardShortcuts="mapOptions.keyboardShortcuts"
  >

    <!-- 顯示目前位置及可打卡位置(用紅/黃色區分) -->
    <MarkerCluster>
      <Marker :options="{ position: props.currentPosition, icon: currentPositionIcon }" />
      <Marker
        v-for="(place, i) in props.placesAllowToClock"
        :options="{ position: place }"
        :key="i"
      />
    </MarkerCluster>

    <!-- 畫出目前位置 400 公尺範圍 -->
    <Circle :options="circleOptions" />
  </GoogleMap>
</template>

<script setup>
import { GoogleMap, Marker, Circle, MarkerCluster } from "vue3-google-map"

import currentPositionIcon from '../assets/position.png'

/* 
* 取得目前及可以打卡的座標位置
* 目前位置用橘色座標顯示，可打卡點用紅色座標顯示
* 當紅色座標出現在藍圈裡就進入可打卡範圍
*/
const props = defineProps({
  currentPosition: {
    type: Object,
    default: () => ({})
  },
  placesAllowToClock: {
    type: Array,
    default: () => [
      {
        lat: 25.09357927147138,
        lng: 121.73557281534109
      },
    ]
  }
})

const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY
// 地圖控制選項
const mapOptions = {
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  clickableIcons: false,
  gestureHandling: 'none',
  keyboardShortcuts: false,
}

// 以當前位置為中心點，畫出 400 公尺範圍圓圈
const circleOptions = {
  center: props.currentPosition,
  radius: 400,
  fillColor: '#6495ED',
  clickable: false,
  strokeOpacity: 0,
}
</script>
