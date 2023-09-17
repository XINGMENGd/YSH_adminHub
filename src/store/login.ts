//src/store/user.ts
import { defineStore } from 'pinia'

export const useLoginStore = defineStore("main", {
  state: () => {
    return {
      token: "",
      username: "",
      isCollapse: false,
      routers: <any>[],  // 路由列表
    }
  },
  getters: {
    GET_IsCollapse(state) {
      return state.isCollapse
    },
    GET_Routers(state) {
      return state.routers
    },
  },
  actions: {
    SetUserStatus(data: any) {
      const { token, username } = data
      this.token = token
      this.username = username
    },
    LOGOUT() {
      this.$reset()
      window.location.reload()
    },
    updateIsCollapse() {
      this.isCollapse = !this.isCollapse
    },
    SET_ROUTERS(routers: any) {
      this.routers = routers
    },
  },
  persist: {
    key: 'loginState',
    storage: sessionStorage, // 数据存储位置，默认为 localStorage
    paths: ['token', 'username', 'isCollapse'], // 用于部分持久化状态的点表示法路径数组，表示不会持久化任何状态（默认为并保留整个状态）
  },
})