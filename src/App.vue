<template>
  <RouterView />
</template>

<script lang="ts" setup>

// import { defineComponent, ref, getCurrentInstance } from 'vue'
// 接收全局方法
// let instance: any = getCurrentInstance()
// const http = instance.proxy.$request
// console.log(http);
// 使用
// http.get('/mock/test').then((res: any) => {
//   console.log(res);
// })

</script>

<style lang="less">
@import '@/assets/style/common.less';

// :global(.类名)   --可设置全局剩下样式，加scoped也一样生效
// :global(.tset1) {
//   color: green;
// }
</style>
