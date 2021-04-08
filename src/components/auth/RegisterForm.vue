<template>
  <form @submit.prevent="registerUser">
    <BaseInput
      label="Name"
      name="name"
      v-model="form.name"
      placeholder="Your name"
      class="mb-2"
    />
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
    <BaseInput
      type="password"
      label="Confirm Password"
      name="password-confirm"
      v-model="form.passwordConfirm"
      class="mb-4"
    />
    <BaseBtn type="submit" text="Register" />
    <FlashMessage :error="form.error" />
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { getError } from '@/utils/helpers'
import AuthService from '@/services/AuthService'
import BaseBtn from '@/components/BaseBtn.vue'
import BaseInput from '@/components/BaseInput.vue'
import FlashMessage from '@/components/FlashMessage.vue'

const router = useRouter()

const form = reactive({
  name: null,
  email: null,
  password: null,
  passwordConfirm: null,
  error: null,
})

const registerUser = () => {
  form.error = null

  const payload = {
    name: form.name,
    email: form.email,
    password: form.password,
    password_confirmation: form.passwordConfirm,
  }

  AuthService.registerUser(payload)
    .then(() => router.push({ name: 'dashboard' }))
    .catch(error => form.error = getError(error))
}
</script>

