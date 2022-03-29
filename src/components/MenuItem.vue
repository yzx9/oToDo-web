<script setup lang="ts">
import type { MenuItem as MenuItemData } from "../types"

const emit = defineEmits<{
  (event: "click", id: bigint): void
}>()

const props = defineProps<{
  activeId: bigint
  item: MenuItemData
}>()
</script>

<template>
  <div class="menu-item">
    <div
      class="menu-item__name h-10 mx-2 relative rounded px-4 flex items-center cursor-pointer transition"
      :class="{ 'menu-item__name--active': props.activeId === props.item.id }"
      @click="() => emit('click', props.item.id)"
    >
      {{ props.item.name }}
    </div>

    <div class="pl-4">
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
}

.menu-item__name {
  @apply hover:bg-zinc-300;

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

.menu-item__name--active {
  @apply bg-zinc-300;

  &::before {
    @apply bg-primary-500;
  }
}
</style>
