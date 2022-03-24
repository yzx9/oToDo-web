import { computed, reactive, readonly, toRef } from "vue"
import {
  getSession,
  refreshSessionToken,
  signIn as _signIn,
  signInByGithubOAuth as _signInByGithubOAuth,
  signOut as _signOut,
} from "./apis"
import type { SessionTokens } from "./types"

const REFRESH_TOKEN_KEY = "OTODO_REFRESH_TOKEN"

const session = reactive({
  accessToken: "",
  refreshToken: "",
})

export const accessToken = readonly(toRef(session, "accessToken"))
export const hasSignIn = computed(() => session.accessToken !== "")

export function updateAccessToken(token: string) {
  if (!hasSignIn.value) {
    throw new Error("should sign-in first")
  }

  session.accessToken = token
}

export async function signIn(userName: string, password: string) {
  const tokens = await _signIn({ userName, password })
  setTokens(tokens)
}

export async function signInByGithubOAuth(code: string, state: string) {
  const tokens = await _signInByGithubOAuth(code, state)
  setTokens(tokens)
}

export async function signInByLocal(): Promise<boolean> {
  try {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
    if (refreshToken === null) {
      return false
    }
    session.refreshToken = refreshToken

    const tokens = await refreshSessionToken(refreshToken)
    setTokens(tokens)
    return true
  } catch (e) {
    return false
  }
}

export async function signOut() {
  session.accessToken = ""
  session.refreshToken = ""
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  stopTimer()
  await _signOut()
}

function setTokens(tokens: SessionTokens) {
  session.accessToken = tokens.accessToken

  if (tokens.refreshToken) {
    session.refreshToken = tokens.refreshToken
    localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken)
  }

  startTimer()
}

let timer: number | null = null
function startTimer() {
  stopTimer()

  const timeout = 4 * 60 * 1000 // parse from access token
  timer = setInterval(async () => {
    await getSession()
  }, timeout)
}

function stopTimer() {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}
