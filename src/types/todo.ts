export interface Todo {
  id: bigint
  title: string
  memo: string
  importance: boolean
  deadline?: string
  notified: boolean
  notifyAt?: string
  done: boolean
  doneAt?: string
  createdAt: string
  updatedAt: string
  userId: bigint
  todolistId: bigint
  todoRepeatFromID?: bigint
  todoRepeatPlan: TodoRepeatPlan
  steps?: TodoStep[]
}

interface TodoRepeatPlan {
  id: bigint
  createdAt: string
  updatedAt: string
  type: string
  interval: number
  before?: string
  weekday: number
}

interface TodoStep {
  id: bigint
  createdAt: string
  updatedAt: string
  name: string
  done: boolean
  doneAt: string
  todoID: bigint
}