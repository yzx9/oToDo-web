<script setup lang="ts">
import { ref } from "vue"
import SearchBar from "../components/SearchBar.vue"
import TodoContent from "../components/TodoContent.vue"
import TodoList from "../components/TodoList.vue"
import TodoListMenu from "../components/TodoListMenu.vue"
import UserProfile from "../components/UserProfile.vue"

const activeTodoListID = ref(0n)
const showTodo = ref(true)
</script>

<template>
  <div class="home flex">
    <nav class="bg-theme w-96 flex flex-col">
      <UserProfile class="h-24" />

      <SearchBar class="h-12" />

      <TodoListMenu v-model="activeTodoListID" class="flex-1" />
    </nav>

    <main class="flex-1" @click="showTodo = !showTodo">
      <TodoList :todoListID="activeTodoListID" />
    </main>

    <aside v-if="showTodo" class="bg-theme w-96">
      <TodoContent />
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
