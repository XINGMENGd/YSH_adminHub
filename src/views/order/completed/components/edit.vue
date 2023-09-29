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
        <el-select v-model.number="formData.category" class="m-2" placeholder="Select" size="default">
          <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品状态" prop="status" :label-width="formLabelWidth">
        <el-select v-model.number="formData.status" class="m-2" placeholder="Select" size="default">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品图片" prop="image" :label-width="formLabelWidth">
        <el-upload v-model:file-list="formData.imageArray" action="http://localhost:3000/nodeMock/uploadImage"
          list-type="picture-card" :on-preview="handlePictureCardPreview">
          <Plus style="width: 2em; height: 2em;" />
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitEmit(formRef)">提交</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible2" width="60%" top="5vh">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { dayjs } from 'element-plus'
import { type FormInstance, UploadProps } from 'element-plus'
import LoginStore from '@/stores/login'
import { updateProduct } from '@/api/Product/index'
import { removeImages } from '@/api/common/index'
import { calculateHash } from '@/utils/util'

const emit = defineEmits(['callback'])
const { categoryList, statusList } = defineProps<{ categoryList: any, statusList: any }>()
const useStore = LoginStore()
const { id } = useStore.GET_userInfo
const formLabelWidth = '90px'
const formRef = ref<FormInstance>();
const DialogVisible = ref(false)
const dialogVisible2 = ref(false)
const dialogImageUrl = ref('')
const formData = ref({
  name: "",
  description: "", // 商品描述
  price: 0,
  stock: 0, // 商品库存
  category: '', // 商品分类
  status: '',
  imageArray: [] as any[],
  images: [] as string[], // 传给后端的图片列表
  sellerId: 0,
  updated_at: ''
})
const oldImages = ref<string[]>([]);
const categoryOptions = categoryList
const statusOptions = statusList
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
    category: '', // 商品分类
    status: '',
    imageArray: [],
    images: [],
    sellerId: 0,
    updated_at: ''
  }
}
// 展示对话框,回显数据
const showDialog = (productInfo: any) => {
  DialogVisible.value = true
  const { imageArray, ...formDataInfo } = productInfo
  oldImages.value = imageArray
  formDataInfo.imageArray = imageArray.map((item: any) => ({ name: item, url: item })) // 对传递的图片数组加工回显页面
  formData.value = formDataInfo
}
// 关闭对话框
const closeDialog = async (done: () => void) => {
  reset();
  try {
    done();
  } catch (error) {
    DialogVisible.value = false
  }
}
// 图片预览
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible2.value = true
}
// 提交表单
const submitEmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const images: string[] = [];
  const reg = /\/uploads\/images\/(.+)/
  for (const item of formData.value.imageArray as { name: string }[]) {
    // 是后端传输回显用的图片，不进行hash加密
    if (item.name.includes("/uploads")) {
      const url: any[] = item.name.match(reg) || []
      images.push(url[1]);
    } else {
      const fileFormat = item.name.split('.');
      const extension = fileFormat[fileFormat.length - 1]; // 图片后缀
      const hash = await calculateHash(item.name); // 使用await阻塞,保证图片地址hash转换完成后之前push进数组后再结束本次循环，确保数组每项hash转换完毕在进行后续逻辑
      images.push(hash + '.' + extension);
    }
  }

  const deletedArray = oldImages.value
    .map((item: any) => {
      const matchResult = reg.exec(item);
      return matchResult ? matchResult[1] : null; // 从匹配结果中提取文件名，若匹配失败则返回null
    })
    .filter((filename: string | null) => filename && !images.includes(filename));

  // 发现新上传的图片列表中有删除旧图片，发送请求给后端删除旧图
  if (deletedArray.length > 0) {
    await removeImages({ deletedArray }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
  }

  await formEl.validate((valid, fields) => {
    if (valid) {
      formData.value.sellerId = id
      formData.value.images = images
      formData.value.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss')
      updateProduct(formData.value).then(res => {
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
