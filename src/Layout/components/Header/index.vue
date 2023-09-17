<template>
  <div class="header">
    <div>
      <el-button style="padding:8px" @click="updateIsCollapse">
        <Expand v-show="isCollapse" style="width: 1em; height: 1em;" />
        <Fold v-show="!isCollapse" style="width: 1em; height: 1em;" />
      </el-button>
    </div>
    <div class="actionBar" @mouseenter="overAction" @mouseleave="outAction">
      <div class="userName">
        <span>{{ username }}</span>
      </div>
      <div class="avatar">
        <el-avatar :icon="UserFilled" :size="40" />
      </div>
      <div class="action" v-if="ifShow">
        <div class="action-item" @click="logOut">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useLoginStore } from '@/store/login';
import { UserFilled } from '@element-plus/icons-vue'

const props = defineProps<{ isCollapse: boolean }>()

const useStore = useLoginStore();
const { username } = storeToRefs(useStore);

const emit = defineEmits(['updateIsCollapse', 'submit'])  // 变量名要与父组件声明的一致，注意，并非是传递给子组件调用的方法名
const updateIsCollapse = function () {
  emit('submit')
}

const ifShow = ref(false)
const overAction = () => {
  ifShow.value = true
}
const outAction = () => {
  ifShow.value = false
}
const logOut = () => {
  ElMessageBox.confirm(
    '是否退出当前账号?',
    '退出登录',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '退出成功',
      })
      useStore.LOGOUT()
    })
    .catch(() => {
      // ElMessage({
      //   type: 'info',
      //   message: 'Delete canceled',
      // })
    })
}
</script>

<style lang='less' scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  .actionBar {
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 10px;
    cursor: pointer;

    .userName {
      margin-right: 5px;
    }

    .action {
      box-sizing: border-box;
      padding: 8px;
      padding-right: 4px;
      position: absolute;
      top: 40px;
      right: 0;
      width: 90%;
      font-size: 14px;
      background-color: rgb(208, 208, 208);

      .action-item {
        padding: 5px;
        text-align: right;

        &:hover {
          background-color: rgb(243, 233, 233);
        }
      }
    }
  }
}
</style>