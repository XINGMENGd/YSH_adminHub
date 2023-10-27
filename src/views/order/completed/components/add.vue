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
          <el-option v-for="item in productCategoryList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品状态" prop="status" :label-width="formLabelWidth">
        <el-select v-model.number="formData.status" class="m-2" placeholder="请选择商品状态" size="default">
          <el-option v-for="item in productStatusList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品图片" prop="imageFileArray" :label-width="formLabelWidth">
        <el-upload v-model:file-list="formData.imageFileArray" list-type="picture-card" accept="image/*" :limit="9"
          :before-upload="handleBeforeUploadImage" :http-request="uploadImageFile" :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <Plus style="width: 2em; height: 2em;" />
        </el-upload>
      </el-form-item>
      <el-form-item label="商品视频" prop="videoFileArray" :label-width="formLabelWidth">
        <uploadVideo v-model:file-list="formData.videoFileArray" :limit="1" :http-request="uploadVideoFile"
          :before-upload="handleBeforeUploadVideo" :on-remove="handleRemove" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitAdd(formRef)">提交</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="showPreviewDialog" width="60%" top="5vh">
    <img style="object-fit: scale-down;width: 100%;height: 100%;" :src="previewFile" alt="Preview Image" />
  </el-dialog>
</template>

<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { dayjs } from 'element-plus'
import { type FormInstance, UploadRawFile, UploadFile, UploadRequestOptions } from 'element-plus'
import LoginStore from '@/stores/Auth'
import { createProduct } from '@/api/Product/index'
import { removeFiles } from '@/api/common/index'
import { hashFile } from '@/utils/index'
import defHttp from '@/utils/http'
import uploadVideo from '@/components/uploadVideo.vue'

const emit = defineEmits(['getProductList'])
const { productCategoryList, productStatusList } = defineProps<{ productCategoryList: any, productStatusList: any }>()
const { id } = LoginStore().GET_userInfo
const formLabelWidth = '90px' // 表单标签宽度
const formRef = ref<FormInstance>(); // 表单实例
const DialogVisible = ref(false) // 是否展示新增商品对话框
const showPreviewDialog = ref(false) // 是否展示预览对话框
const previewFile = ref('') // 预览文件信息
const formData = ref({
  description: "", // 商品描述
  price: 1,
  stock: 1, // 商品库存
  category: '', // 商品分类
  status: '',
  imageFileArray: [] as any[], // 页面展示的图片列表
  imageFiles: [] as any, // 已上传的图片列表(传给后端)
  videoFileArray: [] as any, // 页面展示的视频列表
  videoFiles: [] as any, // 已上传的视频列表(传给后端)
  seller_id: id, // 挂卖人id
  created_at: ''
})
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
  status: [],
  imageFileArray: [],
  videoFileArray: []
})
const maxChunkFileSize = 5 * 1024 * 1024 // 最大分片上传文件大小
const maxFileSize = 500 * 1024 * 1024 // 最大上传文件大小

// 展示对话框
function showDialog() { DialogVisible.value = true; }
// 重置数据
function reset() {
  formData.value = {
    description: "", // 商品描述
    price: 1,
    stock: 1, // 商品库存
    category: '', // 商品分类
    status: '',
    imageFileArray: [],
    imageFiles: [],
    videoFileArray: [],
    videoFiles: [],
    seller_id: id,
    created_at: ''
  }
}
// 关闭对话框
async function closeDialog(done: () => any): Promise<void> {
  // 存在已上传文件，发送请求删除
  const deleteFiles = formData.value.imageFiles.concat(formData.value.videoFiles)
  if (deleteFiles.length > 0) {
    await removeFiles({ deleteFiles }).then(res => {
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
// 上传图片之前的钩子函数
function handleBeforeUploadImage(rawFile: UploadRawFile) {
  if (!rawFile.type.includes('image')) {
    ElMessage.error('请选择正确的图片格式')
    return false
  }
}
// 上传视频之前的钩子函数
function handleBeforeUploadVideo(rawFile: UploadRawFile) {
  return new Promise((resolve, reject) => {
    const fileSize = rawFile.size // 文件大小
    if (fileSize > maxFileSize) {
      ElMessage.error('最大上传文件大小为500MB')
      reject('最大上传文件大小为500MB')
    } else {
      resolve(true)
    }
  })
}
// 自定义上传图片函数
async function uploadImageFile(UploadFile: UploadRequestOptions) {
  const file = UploadFile.file || UploadFile
  const fileSize = file.size // 文件大小
  const fileFormat = file.name.split('.')
  const extension = fileFormat[fileFormat.length - 1]; // 文件后缀
  // 未超过设定上传上限，直接上传
  if (fileSize <= maxChunkFileSize) {
    const hash = await hashFile(file)
    const uploadFormData = new FormData()
    uploadFormData.append('file', file)
    uploadFormData.append('name', hash + '.' + extension)
    uploadFormData.append('type', file.type)
    defHttp.upload({
      url: '/uploadFile',
      data: uploadFormData
    })
    const uploadFile = {
      originalName: file.name,
      name: hash + '.' + extension,
      type: file.type
    }
    formData.value.imageFiles.push(uploadFile)
  } else {
    // 超过设定上传上限，对文件进行切片上传
    const uploadPromiseArray = [] as any // 定义Promise.all数组
    const chunks = Math.ceil(fileSize / maxChunkFileSize); // 获取切片的个数
    const blobSlice = File.prototype.slice // 切片方法
    const hash = await hashFile(file).catch(err => { console.error(err); }) // 获取图片hash
    for (let index = 0; index < chunks; index++) {
      const start = index * maxChunkFileSize
      const end = Math.min(file.size, start + maxChunkFileSize)
      const uploadFormData = new FormData()
      uploadFormData.append('file', blobSlice.call(file, start, end))
      uploadFormData.append('hash', hash)
      uploadFormData.append('index', index as any)
      uploadFormData.append('type', file.type)
      uploadPromiseArray.push(
        defHttp.upload({
          url: '/uploadChunks',
          data: uploadFormData
        })
      )
    }
    // 等待所有分片上传完毕发送合并分片请求
    Promise.all(uploadPromiseArray).then(res => {
      defHttp.post({
        url: '/mergeChunks',
        data: {
          'name': hash + '.' + extension,
          'hash': hash,
          'total': chunks,
          'type': file.type
        }
      })
      const uploadFile = {
        originalName: file.name,
        name: hash + '.' + extension,
        type: file.type
      }
      formData.value.imageFiles.push(uploadFile)
    })
  }
}
// 自定义上传视频函数
async function uploadVideoFile(UploadFile: File) {
  const fileSize = UploadFile.size // 文件大小
  const fileFormat = UploadFile.name.split('.')
  const extension = fileFormat[fileFormat.length - 1]; // 文件后缀
  // 未超过最大分片上传上限，直接上传
  if (fileSize <= maxChunkFileSize) {
    const hash = await hashFile(UploadFile)
    const uploadFormData = new FormData()
    uploadFormData.append('file', UploadFile)
    uploadFormData.append('name', hash)
    uploadFormData.append('type', UploadFile.type)
    defHttp.upload({
      url: '/uploadFile',
      data: uploadFormData
    })
    const uploadFile = {
      originalName: UploadFile.name,
      name: hash + '.' + extension,
      type: UploadFile.type
    }
    formData.value.videoFiles.push(uploadFile)
  } else {
    // 超过设定上传上限，对文件进行切片上传
    const uploadPromiseArray = [] as any // 定义Promise.all数组
    const chunks = Math.ceil(fileSize / maxChunkFileSize); // 获取切片的个数
    const blobSlice = File.prototype.slice // 切片方法
    const hash = await hashFile(UploadFile).catch(err => { console.error(err); }) // 获取图片hash
    for (let index = 0; index < chunks; index++) {
      const start = index * maxChunkFileSize
      const end = Math.min(UploadFile.size, start + maxChunkFileSize)
      const uploadFormData = new FormData()
      uploadFormData.append('file', blobSlice.call(UploadFile, start, end))
      uploadFormData.append('hash', hash)
      uploadFormData.append('index', index as any)
      uploadFormData.append('type', UploadFile.type)
      uploadPromiseArray.push(
        defHttp.upload({
          url: '/uploadChunks',
          data: uploadFormData
        })
      )
    }
    // 等待所有分片上传完毕发送合并分片请求
    Promise.all(uploadPromiseArray).then(res => {
      defHttp.post({
        url: '/mergeChunks',
        data: {
          'name': hash + '.' + extension,
          'hash': hash,
          'total': chunks,
          'type': UploadFile.type
        }
      })
      const uploadFile = {
        originalName: UploadFile.name,
        name: hash + '.' + extension,
        type: UploadFile.type
      }
      formData.value.videoFiles.push(uploadFile)
    })
  }
}
// 图片预览
function handlePictureCardPreview(UploadFile: UploadFile | { raw: any; url: string }) {
  previewFile.value = UploadFile.url!
  showPreviewDialog.value = true
}
// 点击删除文件
async function handleRemove(UploadFile: UploadFile | { raw: any; }) {
  const file = UploadFile.raw || UploadFile
  const fileType = file.type
  let deleteFiles = []

  if (fileType.includes('image')) {
    // 获取当前点击删除的图片信息
    deleteFiles = formData.value.imageFiles.filter((fileInfo: any) => fileInfo.originalName == file.name)
    // 将点击删除后新的上传文件数组数据更新
    formData.value.imageFiles = formData.value.imageFiles.filter((fileInfo: any) => fileInfo.originalName !== file.name)
  } else if (fileType.includes('video')) {
    deleteFiles = formData.value.videoFiles.filter((fileInfo: any) => fileInfo.originalName == file.name)
    // 将点击删除后新的上传文件数组数据更新
    formData.value.videoFiles = formData.value.videoFiles.filter((fileInfo: any) => fileInfo.originalName !== file.name)
  }
  removeFiles({ deleteFiles }).then(res => {
    const videoFileArray = formData.value.videoFileArray.filter((fileInfo: any) => fileInfo.name !== file.name)
    formData.value.videoFileArray = videoFileArray
  })
}
// 提交表单
async function submitAdd(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      formData.value.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss')
      createProduct(formData.value).then(res => {
        DialogVisible.value = false
        reset()
        emit('getProductList')
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

<style lang='scss' scoped></style>
