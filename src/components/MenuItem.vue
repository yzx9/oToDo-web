<script setup lang="ts">
import { computed, ref, watch } from "vue"
import type { MenuItem as MenuItemData } from "../types"

const emit = defineEmits<{
  (event: "click", id: bigint): void
}>()

const props = defineProps<{
  activeId: bigint
  item: MenuItemData
}>()

const opening = ref(false)
const isActive = computed(
  () => props.item.isLeaf && props.activeId === props.item.id
)

function handleClick() {
  if (props.item.isLeaf) {
    emit("click", props.item.id)
  } else {
    opening.value = !opening.value
  }
}
</script>

<template>
  <div
    class="menu-item rounded transition overflow-hidden select-none hover:bg-zinc-300"
    :class="{ 'menu-item--active': isActive }"
  >
    <div
      class="menu-item__name h-10 relative px-4 flex justify-between items-center gap-2 cursor-pointer"
      @click="handleClick"
    >
      <div class="w-10">ICON</div>
      <p class="flex-1">{{ props.item.name }}</p>
      <div class="w-10">
        <div
          v-if="props.item.isLeaf"
          class="bg-zinc-400 rounded-xl flex justify-center items-center text-white"
        >
          {{ props.item.count }}
        </div>

        <div
          v-else
          class="flex justify-center items-center transition"
          :class="{ 'rotate-90': opening }"
        >
          CLOSE
        </div>
      </div>
    </div>

    <div v-if="!props.item.isLeaf && opening" class="mb-2">
      <MenuItem
        v-for="child in props.item.children"
        :key="`menu-item-${child.id}`"
        :active-id="props.activeId"
        :item="child"
        @click="(id) => emit('click', id)"
      />
    </div>
  </div>
</template>

<style lang="postcss">
.menu-item {
  margin-top: 1px;

  & > div > .menu-item {
    @apply ml-2;
  }
}

.menu-item__name::before {
  @apply absolute h-6 rounded bg-transparent transition;

  --w: 2px;
  --2w: calc(2 * var(--w));

  content: "";
  left: calc(-1 * var(--w));
  width: var(--2w);
  margin-left: var(--2w);
}

.menu-item--active {
  @apply bg-zinc-300;

  & .menu-item__name::before {
    @apply bg-primary-500;
  }
}
</style>
