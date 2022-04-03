<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size: string
    width: string
  }>(),
  {
    size: "28px",
    width: "2px",
  }
)
</script>

<template>
  <i class="arrow-right"></i>
</template>

<style lang="postcss">
.arrow-right {
  --sqrt2: 1.414213562;
  --size: v-bind(props.size);
  --width: v-bind(props.width);
  --length: calc(var(--size) / 2 * var(--sqrt2));

  display: inline-block;
  height: var(--size);
  width: var(--size);
  position: relative;

  &::before,
  &::after {
    --offset: calc(var(--size) / 4);

    content: "";
    display: inline-block;
    position: absolute;
    background-color: currentColor;
    height: var(--width);
    width: calc(var(--length) - var(--width) / 2);
    border-radius: var(--width) 0 0 var(--width);
    left: var(--offset);
  }

  &::before {
    width: calc(var(--length) - var(--width) / 2);
    top: var(--offset);
    transform: rotate(45deg);
  }

  &::after {
    bottom: var(--offset);
    transform: rotate(-45deg);
  }
}
</style>
