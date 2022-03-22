<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const form = reactive({
  userName: "",
})

onMounted(() => {
  if (typeof route.query.userName == "string") {
    form.userName = route.query.userName
  }
})
</script>

<template>
  <div>
    <h1>TODO: reset user password</h1>
    <p>user name: {{ form.userName }}</p>
  </div>
</template>
