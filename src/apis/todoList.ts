import type { TodoList } from "../types"
import { get } from "./http"

export async function getTodoLists() {
  const res = await get(`/users/current/todo-lists`)
  return res.data as TodoList[]
}
