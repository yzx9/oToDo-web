<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: string
  }>(),
  {
    size: "28px",
  }
)
</script>

<template>
  <i class="checkbox-tick"></i>
</template>

<style lang="postcss">
.checkbox-tick {
  --size: v-bind(props.size);

  height: var(--size);
  width: var(--size);

  --shotSideLength: calc(var(--size) * 0.5);
  --longSideLength: calc(var(--shotSideLength) * 1.61812);

  position: relative;

  &::after {
    content: "";
    display: inline-block;
    position: absolute;

    left: calc((var(--size) - var(--shotSideLength)) / 2);
    top: 0;

    border: 2px solid currentColor;
    border-left: 0;
    border-top: 0;

    width: var(--shotSideLength);
    height: var(--longSideLength);

    transform: rotate(45deg) scale(0.75);
  }
}
</style>
