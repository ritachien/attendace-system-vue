<template>
  <div class="container">
    <main>
      <router-view />
    </main>
  </div>

</template>

<script setup>
import { RouterView } from 'vue-router'
</script>
<style>
main {
  margin: 0 auto;
  max-width: 600px;
}
</style>
