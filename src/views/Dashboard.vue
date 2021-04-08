<template>
  <div class="px-5 xl:px-0">
    <div class="max-w-xl m-auto">
      <MessageForm class="mb-4" />
      <article class="p-5 bg-white rounded shadow">
        <Messages />
      </article>
    </div>
    <footer class="py-5 text-center">
      <p class="text-gray-400">
        Full documentation for how this application is built can be found at
        <a href="https://laravelvuespa.com/" class="base-link">laravelvuespa.com</a>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { mapGetters } from 'vuex'

import Messages from '@/components/Messages.vue'
import MessageForm from '@/components/MessageForm.vue'

const authUser = computed(() => mapGetters(['auth/authUser']))
</script>
