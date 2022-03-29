import { decodeJwt } from "jose"

export function parseJWTExpiresAt(jwt: string): Date {
  const payload = decodeJwt(jwt)
  if (!payload.exp) {
    return new Date()
  }

  return new Date(1000 * payload.exp)
}
