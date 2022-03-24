<script setup lang="ts">
import { reactive } from "vue"
import Divider from "./Divider.vue"
import TodoListMenuItem from "./TodoListMenuItem.vue"

const emit = defineEmits<{
  (event: "update:modelValue", val: bigint): void
}>()

const props = defineProps<{
  modelValue: bigint
}>()

const pinnedTodoLists = reactive([
  { id: 1n, text: "我的一天" },
  { id: 2n, text: "重要" },
  { id: 3n, text: "计划内" },
  { id: 4n, text: "已分配给我" },
  { id: 5n, text: "任务" },
])

const TodoListTree = reactive([
  { id: 6n, text: "TodoList1" },
  { id: 7n, text: "TodoList2" },
  { id: 8n, text: "TodoList3" },
  { id: 9n, text: "TodoList4" },
  { id: 10n, text: "TodoList5" },
])
</script>

<template>
  <div class="flex flex-col">
    <div>
      <TodoListMenuItem
        v-for="item in pinnedTodoLists"
        :key="'pinned-todo-list-' + item.id"
        :active="props.modelValue == item.id"
        :item="item"
        @click="() => emit('update:modelValue', item.id)"
      />
    </div>

    <Divider class="mx-2" />

    <div class="flex-1 overflow-y-auto">
      <TodoListMenuItem
        v-for="item in TodoListTree"
        :key="'todo-list-tree' + item.text"
        :active="props.modelValue == item.id"
        :item="item"
        @click="() => emit('update:modelValue', item.id)"
      />
    </div>

    <div class="flex justify-between p-1">
      <div
        class="px-2 py-1 rounded cursor-pointer text-sm transition hover:bg-slate-400"
      >
        新建列表
      </div>
      <div
        class="px-2 py-1 rounded cursor-pointer text-sm transition hover:bg-slate-400"
      >
        新建文件夹
      </div>
    </div>
  </div>
</template>
