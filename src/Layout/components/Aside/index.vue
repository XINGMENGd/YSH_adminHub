<template>
  <div @click='handleClickLogo'>芸尚惠logo</div>
  <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" :unique-opened="true">
    <subMenu :routeMenu="routeMenu" />
  </el-menu>
</template>

<script lang="ts" setup>
import { router } from '@/router/index'
import LoginStore from '@/stores/Auth'
import subMenu from './components/subMenu/index.vue'

defineProps<{ isCollapse: boolean }>()
const useStore = LoginStore()
const routeMenu = useStore.GET_routers
function handleClickLogo() { router.push('/') }

</script>

<style lang='scss' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  border: none;
}
</style>
