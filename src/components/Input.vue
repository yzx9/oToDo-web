<script setup lang="ts">
import { computed } from "vue"

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
}>()

const props = defineProps<{
  modelValue: string
}>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(val: string) {
    emit("update:modelValue", val)
  },
})
</script>

<template>
  <input
    v-model="value"
    class="form-input w-full my-1 border-b py-1 border-gray-500 outline-none transition focus:border-cyan-500 hover:border-cyan-500"
  />
</template>

<style lang="postcss">
.form-input {
  & + & {
    @apply mt-4;
  }
}
</style>
