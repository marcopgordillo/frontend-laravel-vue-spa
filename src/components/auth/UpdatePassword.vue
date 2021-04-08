<template>
  <form @submit.prevent="updatePassword">
    <BaseInput
      type="password"
      label="Current Password"
      name="current-password"
      v-model="form.currentPassword"
      placeholder="Your Current Password"
      class="mb-2"
    />
    <BaseInput
      type="password"
      label="New Password"
      name="password"
      v-model="form.password"
      placeholder="Your New Password"
      class="mb-2"
    />
    <BaseInput
      type="password"
      label="Confirm Password"
      name="password-confirm"
      v-model="form.passwordConfirm"
      placeholder="Confirm your new Password"
      class="mb-4"
    />
    <BaseBtn type="submit" text="Update" />
    <FlashMessage :message="message" :error="error" />
  </form>
</template>

<script setup>
import { reactive } from 'vue'

import { getError } from "@/utils/helpers";
import AuthService from "@/services/AuthService";
import BaseBtn from "@/components/BaseBtn.vue";
import FlashMessage from "@/components/FlashMessage.vue";

const form = reactive({
  currentPassword: null,
  password: null,
  passwordConfirm: null,
  error: null,
  message: null,
})

const updatePassword = () => {
  form.error = null
  form.message = null

  const payload = {
    current_password: form.currentPassword,
    password: form.password,
    password_confirm: form.passwordConfirm,
  }

  AuthService.updatePassword(payload)
    .then(() => form.message = 'Password Updated.')
    .catch(error => form.error = getError(error))
}
</script>
