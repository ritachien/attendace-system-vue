<template>
  <div class="container">
    <router-view />
  </div>

</template>

<script setup>
import { RouterView } from 'vue-router'
</script>
<style>
.container {
  margin: 0 auto;
  padding: 0 5vw;
  max-width: 600px;
}
</style>
