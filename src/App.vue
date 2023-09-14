<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { defineComponent, ref, getCurrentInstance } from 'vue';
import http from '@/api/http'
// import loginApi from '@/api/login/menu'
import router from './router/index';//绝对不要加.ts后缀
import { useLoginStore } from '@/store/login';
import { storeToRefs } from 'pinia';
const useStore = useLoginStore();
const { token, getRoutePathNameArr } = storeToRefs(useStore);
// 接收全局方法
// let instance: any = getCurrentInstance()
// const http = instance.proxy.$request
// http.get('/mock/test').then((res: any) => {
//   console.log(res);
// })
// menu()
// http.post('/test').then(res => {
//   console.log(res);
// })
// utils1()

</script>

<style lang="less">
@import '@/assets/style/common.less';

// :global(.类名)   --可设置全局剩下样式，加scoped也一样生效
// :global(.tset1) {
//   color: green;
// }
</style>
