<script setup lang="ts">
import { reactive } from "vue"
import CheckBox from "./CheckBox.vue"
import TodoListItem from "./TodoListItem.vue"

const emit = defineEmits<{
  (event: "clickTodo", id: bigint): void
}>()

const props = defineProps<{
  todoListID: bigint
}>()

const newTodo = reactive({
  id: -1n,
  text: "",
})

const todoGroups = reactive([
  {
    title: "今天",
    collasp: false,
    items: [
      { id: 1n, text: "Todo1", done: true },
      { id: 2n, text: "Todo2", done: false },
      { id: 3n, text: "Todo3", done: false },
      { id: 4n, text: "Todo4", done: false },
      { id: 5n, text: "Todo5", done: false },
      { id: 6n, text: "Todo6", done: true },
      { id: 7n, text: "Todo7", done: false },
      { id: 8n, text: "Todo8", done: false },
      { id: 9n, text: "Todo9", done: false },
      { id: 10n, text: "Todo10", done: false },
    ],
  },
  {
    title: "先前",
    collasp: false,
    items: [
      { id: 11n, text: "Todo11", done: true },
      { id: 12n, text: "Todo12", done: false },
      { id: 13n, text: "Todo13", done: false },
      { id: 14n, text: "Todo14", done: false },
      { id: 15n, text: "Todo15", done: false },
      { id: 16n, text: "Todo16", done: false },
      { id: 17n, text: "Todo17", done: false },
      { id: 18n, text: "Todo18", done: false },
      { id: 19n, text: "Todo19", done: false },
    ],
  },
])

async function handleCreate() {
  // TODO
  newTodo.text = ""
}
</script>

<template>
  <div class="flex flex-col">
    <h2 class="p-8 text-2xl text-white font-bold select-none">
      Todo List ID: {{ props.todoListID }}
    </h2>

    <div class="flex-1 overflow-y-auto">
      <template v-for="g in todoGroups" :key="'todo-list-group-' + g.title">
        <div class="px-8 pt-2 flex">
          <header
            class="px-2 py-1 rounded text-sm bg-zinc-500/80 backdrop-blur text-white cursor-pointer select-none"
            @click="g.collasp = !g.collasp"
          >
            <h3>{{ g.title }}</h3>
          </header>
        </div>

        <template v-if="!g.collasp">
          <TodoListItem
            v-for="todo in g.items"
            :key="'todo-list-' + todo.id"
            @click="emit('clickTodo', todo.id)"
          >
            <template #prepend>
              <CheckBox class="w-8" :checked="todo.done" />
            </template>

            <template #default>
              <p>{{ todo.text }}</p>
            </template>

            <template #append>
              <div class="cursor-pointer">Star</div>
            </template>
          </TodoListItem>
        </template>
      </template>
    </div>

    <div class="pb-5">
      <TodoListItem>
        <template #prepend>
          <CheckBox class="w-8" :checked="false" />
        </template>

        <template #default>
          <input
            v-model="newTodo.text"
            class="bg-transparent outline-none"
            @keyup.enter="handleCreate"
          />
        </template>

        <template #append>
          <div>Star</div>
        </template>
      </TodoListItem>
    </div>
  </div>
</template>
