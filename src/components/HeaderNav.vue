<template>
  <header>
    <nav>
      <router-link
        :to="isNotAdmin ? '/user/clock/gps' : '/admin/users'"
        class="nav-title"
      >
        AMS
      </router-link>
      <div
        class="icons"
        v-if="isAuthenticated"
      >
        <router-link
          class="nav-icon"
          :to="qrURL"
        >
          <n-icon>
            <Qrcode />
          </n-icon>
        </router-link>

        <router-link
          class="nav-icon"
          to="/user/clock/gps"
          v-if="isNotAdmin"
        >
          <n-icon>
            <SearchLocation />
          </n-icon>
        </router-link>

        <router-link
          class="nav-icon"
          to="/user/edit"
          v-if="isNotAdmin"
        >
          <n-icon>
            <user-circle />
          </n-icon>
        </router-link>

        <div
          class="nav-icon"
          @click="logOut()"
        >
          <n-icon>
            <sign-out-alt />
          </n-icon>
        </div>
      </div>

    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { NIcon } from 'naive-ui'
import { UserCircle, SignOutAlt, SearchLocation, Qrcode } from '@vicons/fa'
import { storeToRefs } from 'pinia'

import { useCurrentUserStore } from '../stores/currentUser'
import router from '../router'

const userStore = useCurrentUserStore()
const { isAuthenticated, currentUser } = storeToRefs(userStore)
const isNotAdmin = computed(() => {
  return !currentUser.value.isAdmin
})
const qrURL = computed(() => {
  return currentUser.value.isAdmin ? '/admin/qr' : '/user/clock/qr'
})

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
  text-decoration: none;
}
</style>
