<template>
  <div class="max-w-sm p-5 m-auto">
    <h2 class="mb-4 text-xl font-bold test-center">Login</h2>
    <LoginForm class="p-5 bg-white border rounded shadow" />
    <p class="mt-2 text-gray-500 test-center">
      <router-link
        :to="{ name: 'register' }"
        class="text-pink-500 transition hover:text-pink-600"
      >
        Register for an account
      </router-link>
    </p>
  </div>
</template>

<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
</script>


