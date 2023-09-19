<template>
  <div>logo</div>
  <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" :unique-opened="true">
    <subMenu :routeMenu="routeMenu" />
  </el-menu>
</template>

<script lang="ts" setup>
// import { ref, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
// import { storeToRefs } from 'pinia';
import LoginStore from '@/stores/login'
import subMenu from './components/subMenu/index.vue'

// 声明个变量统一接受传值
defineProps<{ isCollapse: boolean }>()
const useStore = LoginStore()
const routeMenu = useStore.GET_ROUTERS

</script>

<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  border: none;
}
</style>
