import type { MenuItem } from "../types"
import { get } from "./http"

export async function getMenu() {
  const menu = await get(`/users/current/menu`)
  return menu.data as MenuItem[]
}
