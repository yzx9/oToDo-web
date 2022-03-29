import { reactive } from "vue"
import { getMenu as _getMenu } from "../apis"
import type { MenuItem as MenuItemData } from "../types"

const menu = reactive({
  pinned: [
    { id: 1n, name: "我的一天", count: 0, isLeaf: false, children: [] },
    { id: 2n, name: "重要", count: 0, isLeaf: false, children: [] },
    { id: 3n, name: "计划内", count: 0, isLeaf: false, children: [] },
    { id: 4n, name: "已分配给我", count: 0, isLeaf: false, children: [] },
    { id: 5n, name: "任务", count: 0, isLeaf: false, children: [] },
  ],
  tree: [] as MenuItemData[],
})

export function useMenu() {
  getMenu()
  return menu
}

async function getMenu() {
  try {
    menu.tree = await _getMenu()
  } catch (e) {
    // TODO
  }
}
