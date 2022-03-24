<script setup lang="ts">
type Item = { text: string }

const props = defineProps<{
  item: Item
}>()
</script>

<template>
  <div class="h-12 my-2 mx-8 rounded px-4 flex items-center bg-theme">
    {{ props.item.text }}
  </div>
</template>
