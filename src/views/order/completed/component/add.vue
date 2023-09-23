<template>
  <el-dialog v-model="DialogVisible" title="新增商品" destroy-on-close center>
    <el-form :model="formData" ref="formRef" :rules="rules">
      <el-form-item label="商品名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="formData.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品描述" prop="description" :label-width="formLabelWidth">
        <el-input v-model="formData.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品价格" prop="price" :label-width="formLabelWidth">
        <el-input v-model.number="formData.price" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品库存" prop="stock" :label-width="formLabelWidth">
        <el-input v-model.number="formData.stock" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品分类" prop="category" :label-width="formLabelWidth">
        <el-input v-model="formData.category" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品状态" prop="status" :label-width="formLabelWidth">
        <el-input v-model="formData.status" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品图片" prop="image" :label-width="formLabelWidth">
        <el-input v-model="formData.image" autocomplete="off" />
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="DialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAdd(formRef)">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { dayjs, type FormInstance } from 'element-plus'
import { createProduct } from '@/api/Product/index'
import LoginStore from '@/stores/login'

const useStore = LoginStore()
const { id } = useStore.GET_USERINFO
const formLabelWidth = '90px'
const formRef = ref<FormInstance>();
const DialogVisible = ref(false)
const formData = reactive({
  name: "",
  description: "", // 商品描述
  price: 0,
  stock: 0, // 商品库存
  category: 0, // 商品分类
  image: "",
  status: "",
  sellerId: "",
  created_at: ''
})
const rules = reactive({
  name: [
    { required: true, message: 'Please input ProductName', trigger: 'blur' },
    { min: 2, max: 9, message: 'Length should be 2 to 9', trigger: 'blur' }
  ],
  description: [
    { required: true, message: 'Please input Description', trigger: 'blur' },
  ],
  price: [
    { required: true, message: 'Please input price', trigger: 'blur' },
  ],
  stock: [
    { required: true, message: 'Stock minimum 1', trigger: 'blur' },
  ],
  category: [],
  image: [],
  status: []
})
const showAddDialog = () => DialogVisible.value = true

const submitAdd = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      formData.sellerId = id
      formData.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss')
      createProduct(formData).then(res => {
        // DialogVisible.value = false
      })
    } else {
      console.log('error submit!', fields)
      return false
    }
  })
}

defineExpose({
  showAddDialog
})
</script>

<style lang='less' scoped></style>
