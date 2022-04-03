<script setup lang="ts">
import { ref } from "vue"
import Menu from "../components/Menu.vue"
import SearchBar from "../components/SearchBar.vue"
import Todo from "../components/Todo.vue"
import TodoList from "../components/TodoList.vue"
import UserProfile from "../components/UserProfile.vue"
import Cross from "../components/icons/Cross.vue"

const activeTodo = ref(0n)
const activeTodoListID = ref(0n)
const showTodo = ref(true)

function handleTodoClicked(id: bigint) {
  if (activeTodo.value != id) {
    showTodo.value = true
    activeTodo.value = id
  } else {
    showTodo.value = false
    activeTodo.value = 0n
  }
}
</script>

<template>
  <div class="home flex">
    <nav class="bg-theme w-96 flex flex-col">
      <UserProfile class="h-24" />

      <SearchBar class="h-12" />

      <Menu v-model:activeId="activeTodoListID" class="flex-1" />
    </nav>

    <main class="flex-1">
      <TodoList
        class="h-full"
        :todoListID="activeTodoListID"
        @clickTodo="handleTodoClicked"
      />
    </main>

    <aside v-if="showTodo" class="w-96 flex flex-col bg-theme">
      <div
        class="m-4 mb-2 mr-6 self-end cursor-pointer select-none text-2xl"
        @click="showTodo = false"
      >
        <Cross size="20px" width="1.5px" />
      </div>

      <Todo class="flex-1 overflow-y-auto" :todoID="activeTodo" />
    </aside>
  </div>
</template>

<style lang="postcss">
.home {
  height: 100vh;
  width: 100vw;

  background-image: url("/coastal.jpg");
  background-size: cover;
}
</style>
