export interface TodoList {
  id: bigint
  createdAt: string
  updatedAt: string
  name: string
  isSharing: boolean
  userID: number
  todoListFolderID: number
}
