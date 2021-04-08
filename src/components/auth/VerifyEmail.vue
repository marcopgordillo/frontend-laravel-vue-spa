<template>
  <div>
    <form @submit.prevent="sendVerification">
      <BaseBtn text="Verify Email" />
    </form>
    <FlashMessage :message="message" :error="error" />
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { mapGetters } from 'vuex'

import { getError } from '@/utils/helpers'
import AuthService from '@/services/AuthService'
import BaseBtn from '@/components/BaseBtn.vue'
import FlashMessage from '@/components/FlashMessage.vue'

const form = reactive({
  error: null,
  message: null,
})

const authUser = computed(() => mapGetters(['auth/authUser']))

const sendVerification = () => {
  form.error = null
  form.message = null

  const payload = {
    user: authUser.id,
  }

  AuthService.sendVerification(payload)
    .then(() => form.message = 'Verification email sent.')
    .catch(error => form.error = getError(error))
}
</script>

