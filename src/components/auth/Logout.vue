<template>
  <button
    type="button"
    @click="logout"
    class="inline-flex items-center space-x-2"
  >
    <span class="hidden sm:inline">Logout</span>
    <LogoutIcon class="w-6 h-6 text-white" />
  </button>
</template>

<script setup>
import { useStore } from 'vuex'
import { LogoutIcon } from '@heroicons/vue/solid'

const store = useStore()
const logout = () => store.dispatch('auth/logout')
</script>
