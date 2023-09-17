<template>
  <div class="FormBox">
    <el-form :rules="rules" :model="Form" label-width="120px">
      <el-form-item label="username" prop="username">
        <el-input v-model="Form.username" />
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="Form.password" />
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="toLogin">按钮</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useLoginStore } from '@/store/login'
import { useRouter, useRoute } from 'vue-router'
import login from '@/api/login/login'

const useStore = useLoginStore();
const router = useRouter()

const Form = reactive({
  username: 'admin',
  password: '123456',
})

const rules = reactive({
  username: [
    { required: true, message: 'Please input Username', trigger: 'blur' },
    { min: 3, max: 15, message: 'Length should be 6 to 15', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please input PassWord', trigger: 'blur' },
    { min: 6, max: 15, message: 'Length should be 6 to 15', trigger: 'blur' },
  ],
})

const toLogin = async () => {
  login.login({
    username: Form.username,
    password: Form.password
  })
    .then(res => {
      if (res.code !== 200) return ElMessage.error(res.message)

      ElMessage({
        message: '登录成功，即将跳转',
        type: 'success',
        duration: 1000
      })
      useStore.SetUserStatus(res.data)
      setTimeout(() => router.push('/'), 1000);
    })
}

</script>

<style lang='less' scoped>
.FormBox {
  width: 80%;
  margin: 0 auto;
}
</style>