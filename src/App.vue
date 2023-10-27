<template>
  <RouterView />
</template>

<script lang="ts" setup>
// import useCurrentInstance from '@/hooks/useCurrentInstance'
// const { globalProperties } = useCurrentInstance()
// globalProperties.$request.get('/getProductList').then(res => {
//   console.log(res);
// })

</script>

<style lang="scss">
@import '@/assets/style/common.scss';

// :global(.类名)   --可设置全局剩下样式，加scoped也一样生效
// :global(.tset1) {
//   color: green;
// }
</style>
