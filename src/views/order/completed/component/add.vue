<template>
  <el-dialog v-model="DialogVisible" title="新增商品" top="5vh" :before-close="closeDialog">
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
        <el-select v-model="formData.status" class="m-2" placeholder="Select" size="default">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品图片" prop="image" :label-width="formLabelWidth">
        <el-upload v-model:file-list="formData.imageArray" action="http://localhost:3000/nodeMock/uploadImage"
          list-type="picture-card" :on-remove="handleRemove">
          <Plus style="width: 2em; height: 2em;" />
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitAdd(formRef)">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { dayjs, type FormInstance, UploadProps } from 'element-plus'
import LoginStore from '@/stores/login'
import { createProduct } from '@/api/Product/index'
import { removeImages } from '@/api/common/index'
import { calculateHash } from '@/utils/util'

const emit = defineEmits(['callback'])
const useStore = LoginStore()
const { id } = useStore.GET_userInfo
const formLabelWidth = '90px'
const formRef = ref<FormInstance>();
const DialogVisible = ref(false)
const formData = ref({
  name: "",
  description: "", // 商品描述
  price: 0,
  stock: 0, // 商品库存
  category: 0, // 商品分类
  imageArray: [] as any[],
  images: [] as string[], // 传给后端的图片列表
  status: "",
  sellerId: "",
  created_at: ''
})
const statusOptions = reactive([{
  value: 0,
  label: '待发售',
},
{
  value: 1,
  label: '上架',
},
{
  value: 2,
  label: '下架',
},
{
  value: 3,
  label: '售罄',
}])
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
// 重置数据
const reset = () => {
  formData.value = {
    name: "",
    description: "", // 商品描述
    price: 0,
    stock: 0, // 商品库存
    category: 0, // 商品分类
    imageArray: [],
    images: [],
    status: "",
    sellerId: "",
    created_at: ''
  }
}
// 展示对话框
const showDialog = () => DialogVisible.value = true
// 关闭对话框
const closeDialog = async (done: () => void) => {
  if (formData.value.imageArray.length > 0) {
    const deletedArray: string[] = [];
    // 另一种解决异步问题实现方式
    // await Promise.all(
    //   formData.value.images.map(async (item: any) => {
    //     const fileFormat = item.name.split('.');
    //     const extension = fileFormat[fileFormat.length - 1]; // 图片后缀

    //     const hash = await calculateHash(item.name);

    //     deletedArray.push(hash + '.' + extension);
    //   })
    // );
    // 使用类型断言来为 item 添加类型
    for (const item of formData.value.imageArray as { name: string }[]) {
      const fileFormat = item.name.split('.');
      const extension = fileFormat[fileFormat.length - 1]; // 图片后缀
      const hash = await calculateHash(item.name); // 使用await阻塞,保证图片地址hash转换完成后之前push进数组后再结束本次循环，确保数组每项hash转换完毕在进行后续逻辑
      deletedArray.push(hash + '.' + extension);
    }
    // 使用await阻塞，确保删除图片完成后再重置数据并关闭Dialog,使用then和catch确保函数执行完毕返回值不影响页面运行
    await removeImages({ deletedArray }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
  }
  reset();
  // 点击底部的取消按钮没有done函数，采取重置数据隐藏对话框方案
  try {
    done();
  } catch (error) {
    console.log(error);
    DialogVisible.value = false
  }
}
// 点击删除图片 
const handleRemove: UploadProps['onRemove'] = (uploadFile) => {
  const deletedArray: string[] = []
  const fileFormat = uploadFile.name.split('.')
  const extension = fileFormat[fileFormat.length - 1]; // 图片后缀
  // 对图片地址进行hash加密
  calculateHash(uploadFile.name).then(hash => {
    // 补齐图片路径，追加进数组中传递后端删除
    deletedArray.push(hash + '.' + extension)
    removeImages({ deletedArray }).then(res => {
      console.log(res);
    })
  })
}
// 提交表单
const submitAdd = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const images: string[] = [];
  for (const item of formData.value.imageArray as { name: string }[]) {
    const fileFormat = item.name.split('.');
    const extension = fileFormat[fileFormat.length - 1]; // 图片后缀
    const hash = await calculateHash(item.name); // 使用await阻塞,保证图片地址hash转换完成后之前push进数组后再结束本次循环，确保数组每项hash转换完毕在进行后续逻辑
    images.push(hash + '.' + extension);
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      formData.value.sellerId = id
      formData.value.images = images
      formData.value.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss')

      createProduct(formData.value).then(res => {
        DialogVisible.value = false
        reset()
        emit('callback')
      }).catch(error => {
        console.log(error);
      })
    } else {
      console.log('error submit!', fields)
      return false
    }
  })
}

defineExpose({ showDialog })

</script>

<style lang='less' scoped></style>
