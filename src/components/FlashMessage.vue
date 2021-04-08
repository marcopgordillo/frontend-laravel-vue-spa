<template>
  <div>
    <transition-group name="fade">
      <p v-if="message" class="mt-2 text-sm text-green-500" key="message">
        {{ message }}
      </p>
      <p
        v-if="error && getType(error) === 'string'"
        class="mt-2 text-sm text-red-500"
        key="error"
      >
        {{ error }}
      </p>
      <ul
        v-if="getType(error) === 'object'"
        class="mt-2 text-sm text-red-500"
        key="error-list"
      >
        <li v-for="key in errorKeys" :key="key">
          <strong class="font-bold capitalize">{{ titleCase(key) }}</strong>
          <ul class="ml-2">
            <li v-for="(item, index) in getErrors(key)" :key="`${index}-error`">
              {{ item }}
            </li>
          </ul>
        </li>
      </ul>
    </transition-group>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: null
  },
  error: {
    type: [Object, String],
    default: null
  },
})

const errorKeys = computed(() => !props.error || getType(props.error)
    ? null 
    : Object.keys(props.error))

function getErrors(key) {
  return props.error[key]
}

function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

function titleCase(value) {
  return value.replace('_', ' ')
}
</script>
