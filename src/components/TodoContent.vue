<script setup lang="ts">
const props = defineProps<{
  todoID: bigint
}>()
</script>

<template>
  <div>
    <div>This is To-Do Content</div>

    <div>To-Do: {{ props.todoID }}</div>
  </div>
</template>
