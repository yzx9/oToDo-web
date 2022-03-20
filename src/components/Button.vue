<script setup lang="ts">
import { computed } from "vue"

const emit = defineEmits<{
  (event: "click"): void
}>()

const props = defineProps<{
  type?: "primary" | "success" | "danger" | "info"
}>()

const typeClasses = {
  primary: "bg-primary-500 hover:bg-primary-600 active:bg-primary-700",
  success: "bg-success-500 hover:bg-success-600 active:bg-success-700",
  danger: "bg-danger-500 hover:bg-danger-600 active:bg-danger-700",
  info: "bg-info-500 hover:bg-info-600 active:bg-info-700",
}

const typeClass = computed(
  () => typeClasses[props.type ?? "primary"] || typeClasses.primary
)
</script>

<template>
  <button
    class="form-botton w-24 h-8 rounded-sm self-end text-white transition"
    :class="typeClass"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<style lang="postcss">
.form-input + .form-botton {
  @apply mt-4;
}
</style>
