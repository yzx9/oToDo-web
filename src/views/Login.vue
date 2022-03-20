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
  alert("登录了")
}
</script>

<template>
  <Frame title="登陆">
    <FormInput v-model="form.userName" placeholder="电话、用户名或电子邮件" />

    <FormInput v-model="form.password" placeholder="密码" type="password" />

    <FormButton type="primary" @click="handleLogin">登录</FormButton>
  </Frame>
</template>
