<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getGithubOAuthRedirector } from "../apis"
import Button from "../components/Button.vue"
import ButtonLink from "../components/ButtonLink.vue"
import Divider from "../components/Divider.vue"
import Input from "../components/Input.vue"
import Frame from "../components/ViewFrameForm.vue"
import { signIn, signInByGithubOAuth, signInByLocal } from "../session"

const route = useRoute()
const router = useRouter()
const OAuthSessionKey = "OTODO_OAUTH_REDIRECT_FROM"

const form = reactive({
  userName: "",
  password: "",
})

const SignInMethods3rdParty = [
  {
    name: "Github OAuth Login",
    icon: "/3rd-party/GitHub-Mark/GitHub-Mark-64px.png",
    async click() {
      try {
        const { redirectURI } = await getGithubOAuthRedirector()

        if (typeof route.query.from === "string") {
          sessionStorage.setItem(OAuthSessionKey, route.query.from)
        }

        globalThis.window.location.href = redirectURI
      } catch (e) {
        // TODO[feat]: catch error here
        console.log(e)
      }
    },
  },
]

async function handleSignIn() {
  try {
    await signIn(form.userName, form.password, true)
    redirect()
  } catch (e) {
    // TODO[feat]: catch error here
    console.log(e)
  }
}

function handleSignUp() {
  router.push({ path: "/user/signup", query: route.query })
}

function handleReset() {
  router.push({
    path: "/user/reset",
    query: { ...route.query, userName: form.userName },
  })
}

function redirect() {
  if (typeof route.query.from === "string") {
    router.push(route.query.from)
  } else {
    router.push("/")
  }
}

onMounted(async () => {
  const { userName, code, state } = route.query
  if (typeof userName === "string") {
    form.userName = userName
  }

  if (typeof code === "string" && typeof state === "string") {
    try {
      await signInByGithubOAuth(code, state, false)

      const to = sessionStorage.getItem(OAuthSessionKey) || "/"
      router.push(to)
    } catch (e) {
      // TODO[feat]: catch error here
      console.log(e)
    }
  }

  if (await signInByLocal()) {
    redirect()
  }
})
</script>

<template>
  <Frame title="登陆">
    <Input v-model="form.userName" placeholder="电话、用户名或电子邮件" />

    <Input v-model="form.password" placeholder="密码" type="password" />

    <div class="my-4 flex justify-between">
      <ButtonLink @click="handleSignUp">我还没有帐号</ButtonLink>

      <ButtonLink @click="handleReset">忘记密码？</ButtonLink>
    </div>

    <Button type="primary" @click="handleSignIn">登录</Button>

    <Divider class="mt-8" />

    <div class="flex justify-center gap-8">
      <div
        v-for="m in SignInMethods3rdParty"
        :key="`login_3rd_` + m.name"
        class="h-10"
      >
        <img
          class="w-full h-full cursor-pointer"
          :src="m.icon"
          :title="m.name"
          @click="m.click"
        />
      </div>
    </div>
  </Frame>
</template>
