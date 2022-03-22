<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { useRouter } from "vue-router"
import FormButton from "../components/Button.vue"
import ButtonLink from "../components/ButtonLink.vue"
import Divider from "../components/Divider.vue"
import FormInput from "../components/Input.vue"
import { goGithubOAuthLogin, loginByGithubOAuth } from "../services"
import Frame from "./components/AuthFrame.vue"

const router = useRouter()

const form = reactive({
  userName: "",
  password: "",
})

const LoginMethods3rdParty = [
  {
    name: "Github OAuth Login",
    icon: "/3rdParty/GitHub-Mark/GitHub-Mark-64px.png",
    click: goGithubOAuthLogin,
  },
]

function handleLogin() {
  alert("登录了")
}

function handleReset() {
  alert("TODO")
}

function handleRegister() {
  router.push("/register")
}

onMounted(async () => {
  const { username, code, state } = router.currentRoute.value.query
  if (typeof username == "string") {
    form.userName = username
  }

  if (
    typeof code == "string" &&
    typeof state == "string" &&
    (await loginByGithubOAuth(code, state))
  ) {
    router.push("/")
  }
})
</script>

<template>
  <Frame title="登陆">
    <FormInput v-model="form.userName" placeholder="电话、用户名或电子邮件" />

    <FormInput v-model="form.password" placeholder="密码" type="password" />

    <div class="my-4 flex justify-between">
      <ButtonLink @click="handleRegister">我还没有帐号</ButtonLink>

      <ButtonLink @click="handleReset">忘记密码？</ButtonLink>
    </div>

    <FormButton type="primary" @click="handleLogin">登录</FormButton>

    <Divider class="mt-8" />

    <div class="flex justify-center gap-8">
      <div
        v-for="m in LoginMethods3rdParty"
        :key="`login_` + m.name"
        class="h-10"
      >
        <img
          class="w-full h-full cursor-pointer"
          :src="m.icon"
          @click="m.click"
        />
      </div>
    </div>
  </Frame>
</template>
