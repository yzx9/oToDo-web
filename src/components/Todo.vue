<script setup lang="ts">
import { ref } from "vue"
import CheckBox from "./CheckBox.vue"
import Divider from "./Divider.vue"
import TodoCard from "./TodoCard.vue"

type Step = {
  id: bigint
  title: string
  done: boolean
}

const props = defineProps<{
  todoID: bigint
}>()

const todo = ref({
  id: 1n,
  title: "123",
  done: false,
  steps: [
    {
      id: 1n,
      title: "123",
      done: false,
    },
  ],
})

const newStepActive = ref(false)
const newStep = ref("")

function handleTodoEnter() {
  // TODO
}

function handleStepChange(step: Step) {
  // TODO
  if (step.title === "") {
    todo.value.steps = todo.value.steps.filter((a) => a.id !== step.id)
  }
}

function handleNewStepEnter() {
  // TODO
  todo.value.steps.push({
    id: 10n,
    title: newStep.value,
    done: false,
  })
  newStep.value = ""
}
</script>

<template>
  <div class="p-4 flex flex-col items-center gap-4">
    <TodoCard>
      <div class="w-full flex">
        <CheckBox class="w-8 mr-2" :checked="todo.done" />

        <input
          v-model="todo.title"
          class="w-full bg-transparent outline-none text-2xl flex-1 text-black"
          @keyup.enter="handleTodoEnter"
        />
      </div>

      <Divider />

      <div class="flex flex-col gap-2">
        <div v-for="step in todo.steps" class="flex items-center gap-2">
          <CheckBox class="w-6 mx-1" :checked="step.done" />

          <input
            v-model="step.title"
            class="w-full bg-transparent outline-none text-lg flex-1 text-black"
            @keyup.enter="handleStepChange(step)"
            @focusout="handleStepChange(step)"
          />
        </div>

        <div class="flex items-center gap-2">
          <CheckBox v-if="newStepActive" class="w-6 mx-1" :checked="false" />
          <div
            v-else
            class="w-6 h-6 mx-1 text-3xl text-center text-primary-500 flex justify-center items-center"
          >
            <div class="select-none">+</div>
          </div>

          <input
            v-model="newStep"
            :placeholder="todo.steps.length === 0 ? '添加步骤' : '下一步'"
            class="w-full bg-transparent outline-none text-lg flex-1 placeholder:text-primary-500"
            @focusin="newStepActive = true"
            @focusout="newStepActive = false"
            @keyup.enter="handleNewStepEnter"
          />
        </div>
      </div>
    </TodoCard>

    <TodoCard>
      <div class="cursor-pointer">添加到我的一天</div>
    </TodoCard>

    <TodoCard>
      <div class="cursor-pointer">提醒我</div>

      <Divider />

      <div class="cursor-pointer">添加截止日期</div>

      <Divider />

      <div class="cursor-pointer">重复</div>
    </TodoCard>

    <TodoCard>
      <div class="cursor-pointer">添加文件</div>
    </TodoCard>

    <TodoCard>
      <textarea
        class="min-h-[5rem] bg-transparent outline-none placeholder:text-info-500"
        placeholder="添加备注"
      ></textarea>
    </TodoCard>
  </div>
</template>
