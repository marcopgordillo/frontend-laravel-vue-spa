<template>
  <form @submit.prevent="uploadFile">
    <div class="mb-4">
      <label for="file" class="sr-only">
        {{ label }}
      </label>
      <input type="file" :accept="fileTypes" @change="fileChange" id="file" />
    </div>
    <BaseBtn text="Upload" />
    <FlashMessage :message="form.message" :error="form.error" />
  </form>
</template>

<script setup>
import { defineProps, defineEmit, reactive } from 'vue'

import { getError } from "@/utils/helpers";
import FileService from "@/services/FileService";
import BaseBtn from "@/components/BaseBtn.vue";
import FlashMessage from "@/components/FlashMessage.vue";

const props = defineProps({
    fileTypes: {
      type: Array,
      default: null,
    },
    endpoint: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
})

const form = reactive({
  file: null,
  message: null,
  error: null,
})

const clearMessage = () => {
  form.error = null
  form.message = null
}

const fileChange = (event) => {
  clearMessage()
  form.file = event.target.files[0]
}

const emit = defineEmit(['fileUploaded'])

const uploadFile = () => {
  const payload = {}
  const formData = new FormData()
  formData.append('file', form.file)
  payload.file = formData
  payload.endpoint = props.endpoint
  clearMessage()
  FileService.uploadFile(payload)
  .then(() => {
    form.message = 'File uploaded.'
    emit('fileUploaded')
  })
  .catch(error => form.error = getError(error))
}
</script>
