<script setup>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterView } from 'vue-router'

import HeaderNav from './components/HeaderNav.vue';

</script>

<template>
  <HeaderNav />
  <RouterView />
</template>

<style scoped>
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}
</style>
