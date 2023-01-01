<template>
  <header>
    <nav>
      <span class="nav-title">
        AMS
      </span>
      <div class="icons">
        <div class="nav-icon">
          <n-icon>
            <user-circle />
          </n-icon>
        </div>
        <div class="nav-icon" v-if="isAuthenticated" @click="logOut()">
          <n-icon>
            <sign-out-alt />
          </n-icon>
        </div>
      </div>

    </nav>
  </header>
</template>

<script setup>
import { NIcon } from 'naive-ui'
import { UserCircle, SignOutAlt } from '@vicons/fa'
import { storeToRefs } from 'pinia'

import { useCurrentUserStore } from '../stores/currentUser'
import router from '../router'

const userStore = useCurrentUserStore()
const { isAuthenticated } = storeToRefs(userStore)

function logOut () {
  localStorage.removeItem('token')
  userStore.revokeAuthentication()
  return router.push('/login')
}
</script>

<style scoped>
header {
  height: 60px;
  color: #666666;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.08);
}

nav {
  margin: 0 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

n-icon {
  height: 100%;
}

.icons {
  display: flex;
}

.nav-icon {
  margin: 10px;
  font-size: 30px;
}

.nav-icon:hover {
  color: cornflowerblue;
  cursor: pointer;
}

.nav-title {
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 30px;
}
</style>
