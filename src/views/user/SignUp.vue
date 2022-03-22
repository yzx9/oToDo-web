<script setup lang="ts">
import { reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import FormButton from "../../components/Button.vue"
import ButtonLink from "../../components/ButtonLink.vue"
import FormInput from "../../components/Input.vue"
import Frame from "../../components/ViewFrameForm.vue"

const route = useRoute()
const router = useRouter()

const form = reactive({
  userName: "",
  password: "",
})

async function handleLogin() {
  alert("注册了")
  redirect(form.userName)
}

function redirect(userName?: string) {
  if (userName) {
    router.push({ path: "/signin", query: { ...route.query, userName } })
  } else {
    router.push({ path: "/signin", query: route.query })
  }
}
</script>

<template>
  <Frame title="注册">
    <FormInput v-model="form.userName" placeholder="用户名" />

    <FormInput v-model="form.password" placeholder="密码" type="password" />

    <div class="my-4 flex justify-between">
      <ButtonLink @click="redirect">我已有帐号</ButtonLink>
    </div>

    <FormButton type="primary" @click="handleLogin">注册</FormButton>
  </Frame>
</template>
