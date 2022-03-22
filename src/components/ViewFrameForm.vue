<script setup lang="ts">
import Card from "./Card.vue"

defineProps<{
  title: string
}>()
</script>

<template>
  <div class="auth-frame box-border p-4 flex justify-center items-center">
    <Card class="w-full max-w-md">
      <div class="max-w-[10rem]">
        <img src="/logo.jpg" />
      </div>

      <h1 class="text-xl font-bold my-4">{{ title }}</h1>

      <slot></slot>
    </Card>
  </div>
</template>

<style>
.auth-frame {
  width: 100vw;
  height: 100vh;

  background: radial-gradient(
      at 0% 30%,
      rgba(238, 156, 167, 0.3),
      rgba(255, 221, 225, 0.3)
    ),
    white;
}
</style>
