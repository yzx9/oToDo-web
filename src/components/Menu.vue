<script setup lang="ts">
import { useMenu } from "../services"
import Divider from "./Divider.vue"
import MenuItem from "./MenuItem.vue"

const emit = defineEmits<{
  (event: "update:activeId", val: bigint): void
}>()

const props = defineProps<{
  activeId: bigint
}>()

const menu = useMenu()
</script>

<template>
  <div class="px-2 flex flex-col">
    <MenuItem
      v-for="item in menu.pinned"
      :key="`menu-pinned-${item.id}`"
      :active-id="props.activeId"
      :item="item"
      @click="(id) => emit('update:activeId', id)"
    />
    <Divider />

    <div class="flex-1 overflow-y-auto">
      <MenuItem
        v-for="item in menu.tree"
        :key="`menu-${item.id}`"
        :active-id="props.activeId"
        :item="item"
        @click="(id) => emit('update:activeId', id)"
      />
    </div>

    <div class="flex justify-between p-1">
      <div
        class="px-2 py-1 rounded cursor-pointer text-sm transition hover:bg-zinc-300"
      >
        新建列表
      </div>
      <div
        class="px-2 py-1 rounded cursor-pointer text-sm transition hover:bg-zinc-300"
      >
        新建文件夹
      </div>
    </div>
  </div>
</template>
