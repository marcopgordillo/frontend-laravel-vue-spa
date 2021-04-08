<template>
  <div>
    <form @submit.prevent="sendVerification">
      <BaseBtn text="Verify Email" />
    </form>
    <FlashMessage :message="form.message" :error="form.error" />
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'

import { getError } from '@/utils/helpers'
import AuthService from '@/services/AuthService'
import BaseBtn from '@/components/BaseBtn.vue'
import FlashMessage from '@/components/FlashMessage.vue'

const store = useStore()

const form = reactive({
  error: null,
  message: null,
})

const authUser = computed(() => store.getters['auth/authUser'])

const sendVerification = () => {
  form.error = null
  form.message = null

  const payload = {
    user: authUser.value.id,
  }

  AuthService.sendVerification(payload)
    .then(() => form.message = 'Verification email sent.')
    .catch(error => form.error = getError(error))
}
</script>

