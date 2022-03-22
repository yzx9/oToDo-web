import type { LoginDTO, OAuthRedirector, SessionTokens } from "../types"
import { del, get, post } from "./http"

export async function login(data: LoginDTO) {
  const resopnse = await post("/sessions", data)
  return resopnse.data as SessionTokens
}

export async function getSession() {
  await get("/sessions")
}

export async function logout() {
  await del("/sessions")
}

export async function refreshSessionToken() {
  const resopnse = await post("/sessions/current/tokens")
  return resopnse.data as SessionTokens
}

export async function getGithubOAuthRedirector() {
  const response = await get("/sessions/oauth/github")
  return response.data as OAuthRedirector
}

export async function loginByGithubOAuth(code: string, state: string) {
  const response = await post("/sessions/oauth/github", { code, state })
  return response.data as SessionTokens
}
