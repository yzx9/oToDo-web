<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: string
    width?: string
  }>(),
  {
    size: "28px",
    width: "2px",
  }
)
</script>

<template>
  <i class="cross-tag"></i>
</template>

<style lang="postcss">
.cross-tag {
  --sqrt2: 1.414213562;
  --size: v-bind(props.size);
  --width: v-bind(props.width);
  --length: calc(var(--size) * var(--sqrt2));

  display: inline-block;
  height: var(--size);
  width: var(--size);
  position: relative;

  &::before,
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    background-color: currentColor;
    height: var(--width);
    width: var(--length);

    top: calc(var(--size) / 2);

    border-radius: var(--width);
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
}
</style>
