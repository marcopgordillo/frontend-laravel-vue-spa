<template>
  <div>
    <label 
      :for="name"
      class="text-sm text-gray-500"
      :class="{ 'sr-only': !showLabel }"
      v-if="label"
    >
      {{ label }}
    </label>
    <input
      :id="name"
      :type="type" 
      :value="modelValue"
      :required="required"
      @input="updateValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 appearance-none rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmit } from 'vue'

defineProps({
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: 'text'
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    autocomplete: {
      type: String,
      default: null
    },
})

const emit = defineEmit(['update:modelValue'])

function updateValue(event) {
  return emit('update:modelValue', event.target.value)
}
</script>

