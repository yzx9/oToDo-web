import {
  getGithubOAuthRedirector,
  getSession,
  login as _login,
  loginByGithubOAuth as _loginByGithubOAuth,
  logout as _logout,
} from "../apis"
import { useSessionStore } from "../store"
import type { SessionTokens } from "../types"

export async function login(userName: string, password: string) {
  const tokens = await _login({ userName, password })
  setToken(tokens)
}

export async function refresh() {
  await getSession()
}

export async function logout() {
  const store = useSessionStore()

  store.accessToken = ""
  store.refreshToken = ""
  await _logout()
}

export function isLoggedIn() {
  const store = useSessionStore()
  return typeof store.accessToken === "string"
}

/**
 * OAuth
 */

export async function goGithubOAuthLogin() {
  try {
    const { redirectURI } = await getGithubOAuthRedirector()
    globalThis.window.location.href = redirectURI
  } catch (e) {
    // TODO[feat]: catch error here
    console.log(e)
  }
}

export async function loginByGithubOAuth(code: string, state: string) {
  try {
    const tokens = await _loginByGithubOAuth(code, state)
    setToken(tokens)
    return true
  } catch (e) {
    // TODO[feat]: catch error here
    console.log(e)
    return false
  }
}

function setToken(tokens: SessionTokens) {
  const store = useSessionStore()
  store.accessToken = tokens.accessToken

  if (tokens.refreshToken) {
    store.refreshToken = tokens.refreshToken
  }
}
