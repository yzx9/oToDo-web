export interface User {
  id: bigint
  name: string
  nickname: string
  email?: string
  telephone?: string
  avatar?: string
  basicTodoListID?: bigint
  createdAt: string
  updatedAt: string
}