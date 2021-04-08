<template>
  <div class="pl-5 xl:px-0">
    <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      <AuthUser class="p-5 bg-white border rounded shadow" />
      <AuthUserForm class="p-5 bg-white border rounded shadow" />
      <UpdatePassword class="p-5 bg-white border rounded shadow" />
      <FileUpload 
        label="Upload Avatar"
        :fileTypes="['image/*']"
        endpoint="/users/auth/avatar"
        @fileUploaded="updateUser"
        class="p-5 bg-white border rounded shadow"
      />
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

import AuthUser from '@/components/auth/AuthUser.vue'
import AuthUserForm from '@/components/auth/AuthUserForm.vue'
import UpdatePassword from '@/components/auth/UpdatePassword.vue'
import FileUpload from '@/components/auth/FileUpload.vue'

const store = useStore()
const updateUser = () => store.dispatch('auth/getAuthUser')
</script>
