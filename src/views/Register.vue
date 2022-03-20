<script setup lang="ts">
import { reactive } from "vue"
import FormButton from "../components/Button.vue"
import FormInput from "../components/Input.vue"
import Frame from "./components/AuthFrame.vue"

const form = reactive({
  userName: "",
  password: "",
})

function handleLogin() {
  alert("注册了")
}
</script>

<template>
  <Frame title="注册">
    <FormInput v-model="form.userName" placeholder="用户名" />

    <FormInput v-model="form.password" placeholder="密码" type="password" />

    <FormButton type="primary" @click="handleLogin">注册</FormButton>
  </Frame>
</template>
