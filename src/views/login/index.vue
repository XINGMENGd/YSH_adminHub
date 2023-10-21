<template>
  <div class="FormBox">
    <el-form :rules="rules" :model="FormData" ref="formRef" label-width="120px">
      <el-form-item label="username" prop="username">
        <el-input v-model="FormData.username" />
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="FormData.password" />
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="submitLogin(formRef)">按钮</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import LoginStore from '@/stores/Auth'
import { login } from '@/api/Authentication'

const useStore = LoginStore()
const router = useRouter()

const formRef = ref();
const FormData = reactive({
  username: 'admin',
  password: '123456'
})

const rules = reactive({
  username: [
    { required: true, message: 'Please input Username', trigger: 'blur' },
    { min: 3, max: 15, message: 'Length should be 6 to 15', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input PassWord', trigger: 'blur' },
    { min: 6, max: 15, message: 'Length should be 6 to 15', trigger: 'blur' }
  ]
})

const submitLogin = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
    if (valid) {
      login({
        username: FormData.username,
        password: FormData.password
      })
        .then(res => {
          useStore.SET_userInfo(res.data)
          setTimeout(() => router.push('/'), 1000)
        })
        .catch(res => {
          console.log(res)
        })
    } else {
      console.log('error submit!', fields)
      return false
    }
  })

}

</script>

<style lang='less' scoped>
.FormBox {
  width: 80%;
  margin: 0 auto;
}
</style>
