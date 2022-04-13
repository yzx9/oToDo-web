import type { LoginDTO, OAuthRedirector, SessionTokens } from "../types"
import { del, get, post } from "./http"

export async function signIn(data: LoginDTO) {
  const resopnse = await post("/sessions", data)
  return resopnse.data as SessionTokens
}

export async function signOut() {
  await del("/sessions")
}

export async function getSession() {
  await get("/sessions")
}

export async function signInByRefreshToken(refreshToken: string) {
  const resopnse = await post("/sessions/current/tokens", { refreshToken })
  return resopnse.data as SessionTokens
}

export async function getGithubOAuthRedirector() {
  const response = await get("/sessions/oauth/github")
  return response.data as OAuthRedirector
}

export async function signInByGithubOAuth(code: string, state: string) {
  const response = await post("/sessions/oauth/github", { code, state })
  return response.data as SessionTokens
}
