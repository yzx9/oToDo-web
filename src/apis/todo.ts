import type { TodoList } from "../types"
import { get } from "./http"

export async function getTodosByTodoList(todoListID: bigint) {
  const res = await get(`/todo-lists/${todoListID}/todos`)
  return res.data as TodoList
}
