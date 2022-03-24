<script setup lang="ts">
import { reactive } from "vue"
import CheckBox from "./CheckBox.vue"

const props = defineProps<{
  todoListID: BigInt
}>()

const todoGroups = reactive([
  {
    title: "先前",
    items: [
      { id: 1n, text: "Todo1" },
      { id: 2n, text: "Todo2" },
      { id: 3n, text: "Todo3" },
      { id: 4n, text: "Todo4" },
      { id: 5n, text: "Todo5" },
    ],
  },
])
</script>

<template>
  <div>
    <h2>Todo List ID: {{ props.todoListID }}</h2>

    <div v-for="g in todoGroups">
      <h3>{{ g.title }}</h3>

      <div
        v-for="todo in g.items"
        :key="'todo-list-' + todo.id"
        class="todo-list__item flex justify-between items-center"
      >
        <CheckBox class="w-8" />

        <p class="flex-1">{{ todo.text }}</p>

        <div></div>
      </div>
    </div>

    <div class="todo-list__item fixed bottom-0 flex items-center">123123</div>
  </div>
</template>

<style lang="postcss">
.todo-list__item {
  @apply h-12 my-2 mx-8 rounded px-4 bg-theme;
}
</style>
