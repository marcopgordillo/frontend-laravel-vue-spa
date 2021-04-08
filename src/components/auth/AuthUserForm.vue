<template>
  <form @submit.prevent="updateUser">
    <BaseInput
      label="Name"
      name="name"
      v-model="form.name"
      autocomplete="form.name"
      placeholder="Your Name"
      class="mb-2"
    />
    <BaseInput
      type="email"
      label="Email"
      name="email"
      v-model="form.email"
      autocomplete="form.email"
      placeholder="Your Email"
      class="mb-4"
    />
    <BaseBtn text="Update" />
    <FlashMessage :message="form.message" :error="form.error" />
  </form>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import { getError } from '@/utils/helpers'
import AuthService from '@/services/AuthService'
import BaseBtn from '@/components/BaseBtn.vue'
import BaseInput from '@/components/BaseInput.vue'
import FlashMessage from '@/components/FlashMessage.vue'

const store = useStore()
const authUser = computed(() => store.getters['auth/authUser'])

const form = reactive({
  name: null,
  email: null,
  error: null,
  message: null,
})

const updateUser = () => {
  form.error = null
  form.message = null
  
  const payload = {
    name: form.name,
    email: form.email,
  }

  AuthService.updateUser(payload)
    .then(() => store.dispatch('auth/getAuthUser'))
    .then(() => form.message = 'User updated.')
    .catch(error => form.error = getError(error))
}

onMounted(() => {
  form.name = authUser.value.name
  form.email = authUser.value.email
})
</script>

