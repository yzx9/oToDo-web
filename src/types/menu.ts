export interface MenuItem {
  id: bigint
  name: string
  count: number
  isLeaf: boolean
  children: MenuItem[]
}
