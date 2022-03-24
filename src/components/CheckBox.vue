<script setup lang="ts">
const emit = defineEmits<{
  (event: "click"): void
}>()
</script>

<template>
  <div class="w-6">
    <div class="relative pb-[100%]">
      <div
        class="absolute w-full h-full border-2 border-gray-500 rounded-full cursor-pointer"
        @click="emit('click')"
      ></div>
    </div>
  </div>
</template>
