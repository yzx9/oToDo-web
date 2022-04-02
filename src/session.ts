import dayjs from "dayjs"
import { computed, reactive, readonly, toRef } from "vue"
import {
  getSession,
  refreshSessionToken,
  signIn as _signIn,
  signInByGithubOAuth as _signInByGithubOAuth,
  signOut as _signOut,
} from "./apis"
import type { LoginDTO, SessionTokens } from "./types"
import { parseJWTExpiresAt } from "./utils"
import { persistence as _persistence } from "./store"

const REFRESH_TOKEN_KEY = "OTODO_REFRESH_TOKEN"
const REFRESH_TOKEN_EXP = 15 * 24 * 60 * 60 // 15 day
const REFRESH_INTERVAL_BEFORE = 28 * 1000 // 28s
const REFRESH_INTERVAL_DEFAULT = 7.5 * 1000 // 7.5s

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

export async function signIn(
  userName: string,
  password: string,
  persistence: boolean
) {
  _persistence.value = persistence

  const data: LoginDTO = { userName, password }
  if (_persistence.value) data.refreshTokenExp = REFRESH_TOKEN_EXP
  const tokens = await _signIn(data)
  setTokens(tokens)
}

export async function signInByGithubOAuth(
  code: string,
  state: string,
  persistence: boolean
) {
  _persistence.value = persistence

  const tokens = await _signInByGithubOAuth(code, state)
  setTokens(tokens)
}

export async function signInByLocal(): Promise<boolean> {
  try {
    const refreshToken =
      sessionStorage.getItem(REFRESH_TOKEN_KEY) ||
      localStorage.getItem(REFRESH_TOKEN_KEY)
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
  sessionStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  stopTimer()
  await _signOut()
}

function setTokens(tokens: SessionTokens) {
  session.accessToken = tokens.accessToken

  if (tokens.refreshToken) {
    session.refreshToken = tokens.refreshToken
    sessionStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken)

    if (_persistence.value)
      localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken)
  }

  const expiresAt = parseJWTExpiresAt(tokens.accessToken)
  const interval = dayjs(expiresAt)
    .add(-REFRESH_INTERVAL_BEFORE, "millisecond")
    .diff(dayjs(), "millisecond")

  startTimer(interval)
}

let timer: number | null = null
function startTimer(interval: number = REFRESH_INTERVAL_DEFAULT) {
  stopTimer()

  timer = setTimeout(async () => {
    await getSession()

    if (hasSignIn.value) startTimer()
  }, interval)
}

function stopTimer() {
  if (timer !== null) {
    clearTimeout(timer)
    timer = null
  }
}
