<script setup lang="ts">
import CheckTick from "./icons/CheckTick.vue"
const emit = defineEmits<{
  (event: "click"): void
}>()

const props = defineProps<{
  checked: boolean
}>()
</script>

<template>
  <div>
    <div class="relative pb-[100%]">
      <div
        class="absolute w-full h-full border-2 border-gray-500 rounded-full cursor-pointer"
        @click="emit('click')"
      >
        <CheckTick />
      </div>
    </div>
  </div>
</template>
