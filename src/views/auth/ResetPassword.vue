<template>
  <div class="max-w-sm p-5 m-auto">
    <h2 class="mb-4 text-xl font-bold text-center">Reset Password</h2>
    <form
      @submit.prevent="resetPassword"
      class="p-5 bg-white border rounded shadow"
    >
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
        placeholder="Your Password"
        class="mb-2"
      />
      <BaseInput
        type="password"
        label="Confirm Password"
        name="password-confirm"
        v-model="form.passwordConfirm"
        placeholder="Confirm your Password"
        class="mb-4"
      />
      <BaseBtn type="submit" text="Reset Password" />
    </form>
    <FlashMessage :message="message" :error="error" />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

import { getError } from "@/utils/helpers";
import AuthService from "@/services/AuthService";
import BaseInput from "@/components/BaseInput.vue";
import BaseBtn from "@/components/BaseBtn.vue";
import FlashMessage from "@/components/FlashMessage.vue";

const route = useRoute()

const form = reactive({
  email: null,
  password: null,
  passwordConfirm: null,
  error: null,
  message: null,
})

const resetPassword = () => {
  form.error = null
  form.message = null

  const payload = {
    email: form.email,
    password: form.password,
    password_confirmation: form.passwordConfirm,
    token: route.query.token,
  }

  AuthService.resetPassword(payload)
    .then(() => form.message = 'Password reset.')
    .catch(error => form.error = getError(error))
}
</script>
