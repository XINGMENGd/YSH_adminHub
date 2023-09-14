//src/store/user.ts
import { defineStore } from 'pinia'
import router from '@/router/index';//绝对不要加.ts后缀

export const useLoginStore = defineStore("main", {
  state: () => {
    return {
      token: "",
      userName: "",
      jurisdiction: <number | string>"",  // 权限
      isCollapse: false,
      routeList: <any>[],  // 路由列表
    }
  },
  getters: {
    GetToken(state) {
      return state.token
    },
    getIsCollapse(state) {
      return state.isCollapse
    },
    getRouteList(state) {
      return state.routeList
    },
  },
  actions: {
    SetToken(token: string) {
      this.token = token
    },
    SetUser(userName: string, jurisdiction: string | number) {
      this.userName = userName
      this.jurisdiction = jurisdiction
    },
    LOGOUT() {
      this.$reset()
      window.location.reload()
    },
    updateIsCollapse() {
      this.isCollapse = !this.isCollapse
    },
    async setRouteList(jurisdiction: string | number) {

    }
  },
  persist: {
    key: 'loginState',
    storage: sessionStorage, // 数据存储位置，默认为 localStorage
    paths: ['token', 'userName', 'jurisdiction', 'isCollapse'], // 用于部分持久化状态的点表示法路径数组，表示不会持久化任何状态（默认为并保留整个状态）
  },
})