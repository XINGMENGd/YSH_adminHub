<template>
  <el-dialog v-model="DialogVisible" title="新增商品" top="5vh" :before-close="closeDialog">
    <el-form :model="formData" ref="formRef" :rules="rules">
      <el-form-item label="商品描述" prop="description" :label-width="formLabelWidth">
        <el-input v-model="formData.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品价格" prop="price" :label-width="formLabelWidth">
        <el-input v-model="formData.price" @blur="formData.price = formData.price * 1" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品库存" prop="stock" :label-width="formLabelWidth">
        <el-input v-model.number="formData.stock" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品分类" prop="category" :label-width="formLabelWidth">
        <el-select v-model.number="formData.category" class="m-2" placeholder="请选择商品类型" size="default">
          <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品状态" prop="status" :label-width="formLabelWidth">
        <el-select v-model.number="formData.status" class="m-2" placeholder="请选择商品状态" size="default">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品图片" prop="image" :label-width="formLabelWidth">
        <el-upload v-model:file-list="formData.imageArray" list-type="picture-card" :on-remove="handleRemove"
          :on-preview="handlePictureCardPreview" :http-request="uploadImages">
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
  <el-dialog v-model="dialogVisible2" width="60%" top="5vh">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { dayjs } from 'element-plus'
import { type FormInstance, UploadProps, UploadFile, UploadRequestOptions } from 'element-plus'
import LoginStore from '@/stores/Auth'
import { createProduct } from '@/api/Product/index'
import { removeFiles } from '@/api/common/index'
import { hashFile } from '@/utils/util'
import http from '@/utils/http'

const emit = defineEmits(['callback'])
const { productCategoryList, productStatusList } = defineProps<{ productCategoryList: any, productStatusList: any }>()
const useStore = LoginStore()
const { id } = useStore.GET_userInfo
const formLabelWidth = '90px'
const formRef = ref<FormInstance>();
const DialogVisible = ref(false)
const dialogVisible2 = ref(false)
const dialogImageUrl = ref('')
const formData = ref({
  description: "", // 商品描述
  price: 1,
  stock: 1, // 商品库存
  category: '', // 商品分类
  imageArray: [] as any[],
  images: [] as any, // 传给后端的图片列表
  status: '',
  seller_id: 0,
  created_at: ''
})
const categoryOptions = productCategoryList
const statusOptions = productStatusList
const rules = reactive({
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
  imageArray: [],
  status: []
})
// 重置数据
const reset = () => {
  formData.value = {
    description: "", // 商品描述
    price: 1,
    stock: 1, // 商品库存
    category: '', // 商品分类
    imageArray: [],
    images: [],
    status: '',
    seller_id: 0,
    created_at: ''
  }
}
// 展示对话框
const showDialog = () => DialogVisible.value = true
// 关闭对话框
const closeDialog = async (done: () => void) => {
  if (formData.value.imageArray.length > 0) {
    const deletedArray = [] as any;
    // 另一种解决异步问题实现方式
    // await Promise.all(
    //   formData.value.images.map(async (item: any) => {
    //     const fileFormat = item.name.split('.');
    //     const extension = fileFormat[fileFormat.length - 1]; // 图片后缀
    //     const hash = await hashFile(item.raw);
    //     deletedArray.push(hash + '.' + extension);
    //   })
    // );
    // 使用类型断言来为 item 添加类型
    for (const item of formData.value.imageArray as { name: string, raw: File }[]) {
      const file = item.raw
      const fileFormat = file.name.split('.');
      const extension = fileFormat[fileFormat.length - 1]; // 图片后缀
      const hash = await hashFile(file).catch(err => { console.error(err); })
      const deleteFile = { fileName: hash + '.' + extension, fileType: file.type }
      deletedArray.push(deleteFile);
    }
    // 使用await阻塞，确保删除图片完成后再重置数据并关闭Dialog,使用then和catch确保函数执行完毕返回值不影响页面运行
    await removeFiles({ deletedArray }).then(res => {
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
// 自定义上传图片函数
const uploadImages = async (UploadFiles: UploadRequestOptions) => {
  const file = UploadFiles.file
  const fileSize = file.size // 文件大小
  const maxFileSize = 5 * 1024 * 1024 // 最大上传文件大小
  const fileFormat = file.name.split('.')
  const extension = fileFormat[fileFormat.length - 1]; // 文件后缀
  // 未超过设定上传上限，直接上传
  if (fileSize <= maxFileSize) {
    const hash = await hashFile(file)
    http.upload('/uploadFile', file, { 'fileType': file.type, 'name': hash + '.' + extension })
  } else {
    // 超过设定上传上限，对文件进行切片上传
    const uploadPromiseArray = [] as any // 定义Promise.all数组
    const chunks = Math.ceil(fileSize / maxFileSize); // 获取切片的个数
    const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice; // 切片方法
    const hash = await hashFile(file).catch(err => { console.error(err); }) // 获取图片hash
    for (let i = 0; i < chunks; i++) {
      const start = i * maxFileSize
      const end = Math.min(file.size, start + maxFileSize)
      uploadPromiseArray.push(
        http.upload('/uploadChunks', blobSlice.call(file, start, end), { 'hash': hash, 'index': i, 'fileType': file.type })
      )
    }
    // 等待所有分片上传完毕发送合并分片请求
    Promise.all(uploadPromiseArray).then(res => {
      http.post('/mergeChunks', { 'name': hash + '.' + extension, 'hash': hash, 'total': chunks, 'fileType': file.type })
    })
  }
}
// 图片预览      未完成
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible2.value = true
}
// 点击删除图片 
async function handleRemove(uploadFile: { raw: any; }) {
  const file = uploadFile.raw
  const deletedArray = [] as any
  const fileFormat = file.name.split('.')
  const extension = fileFormat[fileFormat.length - 1]; // 文件后缀
  // 根据后缀判断是删除图片或是视频
  const hash = await hashFile(file).catch(err => console.error(err))
  const deleteFile = { fileName: hash + '.' + extension, fileType: file?.type }
  deletedArray.push(deleteFile)
  removeFiles({ deletedArray }).then(res => {
    console.log(res);
  })
}
// 提交表单
const submitAdd = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const images = [] as any;
  for (const item of formData.value.imageArray as { raw: File, name: string }[]) {
    const file = item.raw
    const fileFormat = file.name.split('.');
    const extension = fileFormat[fileFormat.length - 1]; // 图片后缀
    const hash = await hashFile(file); // 使用await阻塞,保证图片地址hash转换完成后之前push进数组后再结束本次循环，确保数组每项hash转换完毕在进行后续逻辑
    const pushFile = { fileName: hash + '.' + extension, fileType: file.type }
    images.push(pushFile);
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      formData.value.seller_id = id
      formData.value.images = JSON.stringify(images)
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
