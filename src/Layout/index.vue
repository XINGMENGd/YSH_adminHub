<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <Aside :isCollapse="isCollapse"></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header :isCollapse="isCollapse" @submit="updateIsCollapse"></Header>
        </el-header>
        <el-main ref="main">
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref, provide, nextTick } from 'vue'
import Aside from './components/Aside/index.vue'
import Header from './components/Header/index.vue'
import Main from './components/Main/index.vue'

import LoginStore from '@/stores/login'
import { storeToRefs } from 'pinia'
import { useWindowResize } from '@/hooks/useWindowResize'

const useStore = LoginStore()
const router = useRouter()

// 解构数据，但是得到的数据是不具有响应式的，只是一次性的
// 相当于仅仅只是...mainStore而已，只是做了reactive处理，并没有做toRefs,不是一直响应的
// const isCollapse = useStore.getIsCollapse
// console.log(isCollapse);   // false
// useStore.updateIsCollapse()
// console.log(isCollapse);   // false
// 解决方法：
// 通过pinia中提供的storeToRefs方法来解决，推荐使用
const { isCollapse } = storeToRefs(useStore)
function updateIsCollapse(): void {
  useStore.UPDATE_isCollapse()
}

const { main, onResize } = useWindowResize()
// 路由切换后调用函数重新计算高度
router.afterEach(() => {
  nextTick(() => {
    onResize()
  })
})

</script>

<style lang='less' scoped>
.common-layout {
  height: 100%;
}

.el-container {
  height: 100%;
}

.el-aside {
  width: auto;
  border-right: 1px solid #ccc;
}

/*滚动条整体样式*/
.el-aside::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}

/*滚动条里面小方块*/
.el-aside::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #f90;
  // background-image:
  //   -webkit-linear-gradient(45deg,
  //     rgba(255, 255, 255, .2) 25%,
  //     transparent 25%,
  //     transparent 50%,
  //     rgba(255, 255, 255, .2) 50%,
  //     rgba(255, 255, 255, .2) 75%,
  //     transparent 75%,
  //     transparent);
}

/*滚动条里面轨道*/
.el-aside::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  /*border-radius: 10px;*/
  background: #EDEDED;
}

.el-header {
  border-bottom: 1px solid #ccc;
  background-color: #fff;
}
</style>
