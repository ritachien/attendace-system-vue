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
            <BIconQrCode />
          </n-icon>
        </router-link>

        <router-link
          class="nav-icon"
          to="/user/clock/gps"
          v-if="isNotAdmin"
        >
          <n-icon>
            <BIconGeoAlt />
          </n-icon>
        </router-link>

        <router-link
          class="nav-icon"
          to="/user/edit"
          v-if="isNotAdmin"
        >
          <n-icon>
            <BIconPersonCircle />
          </n-icon>
        </router-link>

        <div
          class="nav-icon"
          @click="logOut()"
        >
          <n-icon>
            <BIconBoxArrowRight />
          </n-icon>
        </div>
      </div>

    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { NIcon } from 'naive-ui'
import { BIconQrCode, BIconBoxArrowRight, BIconPersonCircle, BIconGeoAlt } from 'bootstrap-icons-vue'
import { storeToRefs } from 'pinia'

import { useCurrentUserStore } from '../stores/currentUser'

const router = useRouter()
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
  padding: 10px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.08);
}

nav {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icons {
  display: flex;
  margin-right: 10px;
}

.nav-icon {
  margin: 10px;
  font-size: 30px;
  color: #1F6ED4;
}

.nav-icon:hover {
  color: #39BAE8;
  cursor: pointer;
}

.nav-title {
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 30px;
  color: #1F6ED4;
  text-decoration: none;
}
</style>
