export type SessionTokens = {
  accessToken: string
  tokenType: string
  expiresIn: number
  refreshToken: string
}

export type RefreshTokenDTO = {
  refreshToken: string
}

export type LoginDTO = {
  userName: string
  password: string
  refreshTokenExp?: number
}

/*
 * OAuth
 */

export type OAuthRedirector = {
  redirectURI: string
}

export type OAuthPayload = {
  code: string
  state: string
}
