//src/store/user.ts
import { defineStore } from 'pinia'

export const useTestStore = defineStore("main", {
  state: () => {
    return {
      count: 1
    }
  },
  getters: {
    getCount(state) {
      return state.count
    }
  },
  actions: {
    addCount() {
      this.count += 1
    }
  },
  persist: {
    key: 'count',
    storage: sessionStorage, // 数据存储位置，默认为 localStorage
    paths: ['count'], // 用于部分持久化状态的点表示法路径数组，表示不会持久化任何状态（默认为并保留整个状态）
  },
})