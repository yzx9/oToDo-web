<script setup lang="ts">
const emit = defineEmits<{
  (event: "click"): void
}>()
</script>

<template>
  <div
    class="h-12 my-2 mx-6 rounded px-4 bg-theme flex justify-between items-center"
    @click="emit('click')"
  >
    <div class="mx-1">
      <slot name="prepend"></slot>
    </div>

    <div class="mx-2 flex-1">
      <slot name="default"></slot>
    </div>

    <div class="mx-1">
      <slot name="append"></slot>
    </div>
  </div>
</template>
