<script setup lang="ts">
import { ref } from "vue"

const nickname = ref("Admin")
</script>

<template>
  <div class="py-2 flex justify-center items-center gap-8 overflow-hidden">
    <div class="w-20">
      <div class="relative pb-[100%] rounded-full bg-gray-500">
        <img />
      </div>
    </div>

    <div class="w-36">
      <div>{{ nickname }}</div>
    </div>
  </div>
</template>
