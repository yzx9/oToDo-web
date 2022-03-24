<script setup lang="ts">
type TodoList = { text: string }

const emit = defineEmits<{
  (event: "click"): void
}>()

const props = defineProps<{
  active: boolean
  item: TodoList
}>()
</script>

<template>
  <div
    class="todo-list-menu-item h-10 mx-2 rounded px-4 flex items-center cursor-pointer transition"
    :class="{ 'todo-list-menu-item--active': props.active }"
    @click="() => emit('click')"
  >
    {{ props.item.text }}
  </div>
</template>

<style lang="postcss">
.todo-list-menu-item {
  @apply hover:bg-zinc-300;

  margin-top: 1px;

  &::before {
    @apply absolute h-5 rounded bg-transparent transition;

    --w: 2px;
    --2w: calc(2 * var(--w));

    content: "";
    left: var(--w);
    width: var(--2w);
    margin-left: var(--2w);
  }
}

.todo-list-menu-item--active {
  @apply bg-zinc-300;

  &::before {
    @apply bg-primary-500;
  }
}
</style>
