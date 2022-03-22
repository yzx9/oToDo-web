<script setup lang="ts">
const emit = defineEmits<{
  (event: "click"): void
}>()
</script>

<template>
  <a
    class="botton-link text-primary-500 decoration-primary-500 transition cursor-pointer hover:underline hover:text-primary-600 active:text-primary-700"
    @click.prevent="() => emit('click')"
  >
    <slot></slot>
  </a>
</template>
