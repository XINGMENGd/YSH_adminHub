<template>
  <template v-for="item in routeMenu">
    <template v-if="item.children && item.children.length > 0">
      <el-sub-menu :key="item.path" :index="item.path">
        <template v-slot:title>
          <el-icon size="16">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <subMenu :routeMenu="item.children" />
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :key="item.path" :index="item.path" @click="skipRouter(item)">
        <el-icon size="16">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<script lang='ts' setup>
import router from '@/router/index'

const { routeMenu } = defineProps<{ routeMenu: any }>()
const skipRouter = async (item: any): Promise<void> => {
  const reg = /\/src\/views\/(.+)\/index\.vue/
  const toPath = '/' + item.component?.toString().match(reg)[1]
  await router.push(toPath)
}

</script>
<script lang="ts">
export default { name: 'subMenu' }
</script>

<style lang='less' scoped></style>

<!-- <template>
  <el-sub-menu v-for="(item, index) in routeMenu" :index="item.path">
    <template #title>
      <el-icon size="20">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </template>
    <el-menu-item v-if="!item.children" :index="item.path" @click="skipRouter(item)">
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
import router from '@/router/index'

const { routeMenu } = defineProps<{ routeMenu: any }>()

const skipRouter = (item: any) => {
  const reg = /\/src\/views\/(.+)\/index\.vue/
  const toPath = '/' + item.component.toString().match(reg)[1]
  router.push(toPath)
}

</script>

<style lang='less' scoped></style> -->
