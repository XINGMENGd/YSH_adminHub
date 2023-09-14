<template>
  <div>logo</div>
  <el-menu 
    class="el-menu-vertical-demo" 
    :collapse="isCollapse" 
    :unique-opened="true" 
    :router="true">
    <!-- <subMenu :routeMenu="routeMenu"/> -->
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { useLoginStore } from '@/store/login';
import { storeToRefs } from 'pinia';


import subMenu from './components/subMenu/index.vue'
const useStore = useLoginStore();
const { routeList } = storeToRefs(useStore);
// 声明个变量统一接受传值
const props = defineProps<{ isCollapse: boolean }>()

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
