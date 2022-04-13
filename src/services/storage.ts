import { watch } from "vue"
import { persistence } from "../store"

export class storage {
  static setItem(key: string, value: string) {
    sessionStorage.setItem(key, value)
    if (persistence.value) localStorage.setItem(key, value)
  }

  static getItem(key: string): string | null {
    return sessionStorage.getItem(key) || localStorage.getItem(key)
  }

  static removeItem(key: string) {
    sessionStorage.removeItem(key)
    localStorage.removeItem(key)
  }

  static clear() {
    sessionStorage.clear()
    localStorage.clear()
  }
}

watch(persistence, () => {
  if (persistence.value == false) {
    sessionStorage.clear()
  }
})
