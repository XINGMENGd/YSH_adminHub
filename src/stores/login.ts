import { defineStore } from 'pinia'

export default defineStore('LoginStore', {
  state: () => {
    return {
      userInfo: { // 用户信息
        token: '',
        username: '',
        avatar: ''
      },
      isCollapse: false, // 是否展开侧边栏
      routers: [] // 路由列表
    }
  },
  getters: {
    GET_USERINFO: state => state.userInfo,
    GET_ROUTERS: state => state.routers
  },
  actions: {
    LOGOUT () {
      this.$reset()
      window.location.reload()
    },
    UPDATE_IsCollapse () {
      this.isCollapse = !this.isCollapse
    },
    SET_USERINFO (data: any) {
      const { token, username } = data
      this.userInfo.token = token
      this.userInfo.username = username
    },
    SET_ROUTERS (routers: any) {
      this.routers = routers
    }
  },
  persist: {
    key: 'loginState',
    storage: sessionStorage, // 数据存储位置，默认为 localStorage
    paths: ['userInfo', 'isCollapse'] // 用于部分持久化状态的点表示法路径数组，表示不会持久化任何状态（默认为并保留整个状态）
  }
})
