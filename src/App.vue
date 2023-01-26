<script setup>
import { RouterView } from 'vue-router'

import HeaderNav from './components/HeaderNav.vue';

</script>

<template>
  <HeaderNav class="navbar" />
  <RouterView />
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  width: 100vw;
  background-color: #fae3d9;
  z-index: 50;
}
</style>
