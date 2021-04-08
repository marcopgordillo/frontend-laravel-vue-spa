<template>
  <form class="p-5 bg-white border rounded shadow" @submit.prevent="login">
    <BaseInput
      type="email"
      label="Email"
      name="email"
      v-model="form.email"
      placeholder="Your Email"
      class="mb-2"
    />
    <BaseInput
      type="password"
      label="Password"
      name="password"
      v-model="form.password"
      class="mb-2"
    />
    <div class="flex justify-between">
      <BaseBtn type="submit" text="Login" />
      <router-link :to="{ name: 'forgot-password' }" class="text-sm base-link">
        Forgot your password?
      </router-link>
    </div>
    <FlashMessage :error="form.error" />
  </form>
  <Logout />
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { getError } from '@/utils/helpers'
import AuthService from '@/services/AuthService'
import BaseBtn from '@/components/BaseBtn.vue'
import BaseInput from '@/components/BaseInput.vue'
import FlashMessage from '@/components/FlashMessage.vue'
import Logout from '@/components/auth/Logout.vue'

const router = useRouter()
const store = useStore()

const form = reactive({
  email: null,
  password: null,
  error: null,
})


const login = async () => {
  form.error = null

  const payload = {
    email: form.email,
    password: form.password,
  }

  try {
    await AuthService.login(payload)
    const authUser = await store.dispatch('auth/getAuthUser')
    if (authUser) {
      store.dispatch('auth/setGuest', {value: 'isNotGuest'})
      router.push({ name: 'dashboard' })
    } else {
      const error = Error('Unable to fetch user after login, check your API settings.')
      error.name = 'Fetch User'
      throw error
    }
  } catch (error) {
    form.error = getError(error)
  }
}
</script>

