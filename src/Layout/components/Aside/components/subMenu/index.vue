<template>
  <el-sub-menu v-for="(item, index) in routeMenu" :index="item.path">
    <template #title>
      <img src="@/assets/icon.png" alt="">
      <span>{{ item.meta.title }}</span>
    </template>
    <el-menu-item v-if="!item.meta.hasChildren" :index="item.path">
      {{ item.meta.title }}
    </el-menu-item>
    <subMenu v-else :routeMenu="item.children" />
  </el-sub-menu>
</template>

<script lang="ts">
export default {
  name: "subMenu"
}
</script>
<script lang='ts' setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
const props = defineProps<{ routeMenu: any }>()
// console.log(props.routeMenu);

</script>

<style lang='less' scoped></style>