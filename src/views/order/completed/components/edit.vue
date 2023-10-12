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
        <el-select v-model.number="formData.category" class="m-2" placeholder="Select" size="default">
          <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品状态" prop="status" :label-width="formLabelWidth">
        <el-select v-model.number="formData.status" class="m-2" placeholder="Select" size="default">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品图片" prop="imageFileArray" :label-width="formLabelWidth">
        <el-upload v-model:file-list="formData.imageFileArray" list-type="picture-card" :limit="9"
          :before-upload="handleBeforeUploadImage" :http-request="uploadFile" :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <Plus style="width: 2em; height: 2em;" />
        </el-upload>
      </el-form-item>
      <el-form-item label="商品视频" prop="videoFileArray" :label-width="formLabelWidth">
        <el-upload v-model:file-list="formData.videoFileArray" list-type="picture-card" :limit="1"
          :before-upload="handleBeforeUploadVideo" :http-request="uploadFile" :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
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
    <img w-full style="object-fit: scale-down;width: 100%;height: 100%;" :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { dayjs } from 'element-plus'
import { type FormInstance, UploadRawFile, UploadFile, UploadRequestOptions } from 'element-plus'
import LoginStore from '@/stores/Auth'
import { updateProduct } from '@/api/Product/index'
import { removeFiles } from '@/api/common/index'
import { hashFile } from '@/utils/util'
import http from '@/utils/http'

const emit = defineEmits(['getProductList'])
const { productCategoryList, productStatusList } = defineProps<{ productCategoryList: any, productStatusList: any }>()
const useStore = LoginStore()
const { id } = useStore.GET_userInfo
const formLabelWidth = '90px'
const formRef = ref<FormInstance>();
const DialogVisible = ref(false)
const dialogVisible2 = ref(false)
const dialogImageUrl = ref('')
const reg = /\/uploads\/(images|videos)\/(.+)/
const oldImageFiles = ref<string[]>([]); // 存储原始旧图片列表信息
const oldVideoFiles = ref<string[]>([]); // 存储原始旧视频列表信息
const uploadedImages = ref([] as any) // 存储当前上传的图片列表信息
const uploadedVideos = ref([] as any) // 存储当前上传的视频列表信息
const formData = ref({
  description: "", // 商品描述
  price: 0,
  stock: 0, // 商品库存
  category: '', // 商品分类
  status: '',
  imageFileArray: [] as any[], // 页面展示的图片列表
  imageFiles: [] as any, // 传给后端的图片列表
  videoFileArray: [] as any[], // 页面展示的视频列表
  videoFiles: [] as any, // 传给后端的视频列表
  seller_id: 0, // 挂卖人id
  updated_at: ''
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
  status: [],
  imageFileArray: [],
  videoFileArray: []
})
// 重置数据
function reset() {
  formData.value = {
    description: "", // 商品描述
    price: 0,
    stock: 0, // 商品库存
    category: '', // 商品分类
    imageFileArray: [],
    imageFiles: [],
    videoFileArray: [],
    videoFiles: [],
    status: '',
    seller_id: 0,
    updated_at: ''
  }
  uploadedImages.value = []
  uploadedVideos.value = []
}
// 展示对话框,回显数据
function showDialog(productInfo: any) {
  DialogVisible.value = true
  const { imageFiles, videoFiles, ...formDataInfo } = productInfo
  // 无法使用一个变量接收下面重复出现逻辑，因为map是返回一个新数组，而使用一个变量接收则会使旧上传文件与现上传文件共用一个内存地址
  // 解决方法，深拷贝后赋值(后续处理)
  // 映射，记录原始旧图片列表信息
  oldImageFiles.value = imageFiles.map((file: any) => ({
    originalName: file.fileName.match(reg)[2],
    fileName: file.fileName.match(reg)[2],
    fileType: file.fileType
  }))
  // 映射，记录原始旧视频列表信息
  oldVideoFiles.value = videoFiles.map((file: any) => ({
    originalName: file.fileName.match(reg)[2],
    fileName: file.fileName.match(reg)[2],
    fileType: file.fileType
  }))
  // 映射，存储当前上传的图片列表信息
  uploadedImages.value = imageFiles.map((file: any) => ({
    originalName: file.fileName.match(reg)[2],
    fileName: file.fileName.match(reg)[2],
    fileType: file.fileType
  }))
  // 映射，存储当前上传的视频列表信息
  uploadedVideos.value = videoFiles.map((file: any) => ({
    originalName: file.fileName.match(reg)[2],
    fileName: file.fileName.match(reg)[2],
    fileType: file.fileType
  }))
  // 对传递的图片数组加工回显页面
  formDataInfo.imageFileArray = imageFiles.map((file: any) => ({
    name: file.fileName,
    url: file.fileName,
    fileType: file.fileType
  }))
  formDataInfo.videoFileArray = videoFiles.map((file: any) => ({
    name: file.fileName,
    url: file.fileName,
    fileType: file.fileType
  }))
  formData.value = formDataInfo
}
// 关闭对话框
async function closeDialog(done: () => void) {
  reset();
  try {
    done();
  } catch (error) {
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
  if (!rawFile.type.includes('video')) {
    ElMessage.error('请选择正确的视频格式')
    return false
  }
  const fileSize = rawFile.size // 文件大小
  const MaxSize = 500 * 1024 * 1024
  // const MaxSize = 2 * 1024 * 1024 * 1024
  if (fileSize > MaxSize) {
    ElMessage.error('最大上传文件大小为500MB')
    return false
  }
}
// 自定义上传文件函数
async function uploadFile(UploadFiles: UploadRequestOptions) {
  const file = UploadFiles.file
  const fileSize = file.size // 文件大小
  const maxFileSize = 5 * 1024 * 1024 // 最大上传文件大小
  const fileFormat = file.name.split('.')
  const extension = fileFormat[fileFormat.length - 1]; // 文件后缀
  // 未超过设定上传上限，直接上传
  if (fileSize <= maxFileSize) {
    const hash = await hashFile(file)
    http.upload('/uploadFile', file, {
      'name': hash + '.' + extension,
      'fileType': file.type
    })
    const uploadFile = {
      originalName: file.name,
      fileName: hash + '.' + extension,
      fileType: file.type
    }
    if (file.type.includes('image')) {
      uploadedImages.value.push(uploadFile)
    } else if (file.type.includes('video')) {
      uploadedVideos.value.push(uploadFile)
    }
  } else {
    // 超过设定上传上限，对文件进行切片上传
    const uploadPromiseArray = [] as any // 定义Promise.all数组
    const chunks = Math.ceil(fileSize / maxFileSize); // 获取切片的个数
    const blobSlice = File.prototype.slice // 切片方法
    const hash = await hashFile(file).catch(err => { console.error(err); }) // 获取图片hash
    for (let i = 0; i < chunks; i++) {
      const start = i * maxFileSize
      const end = Math.min(file.size, start + maxFileSize)
      uploadPromiseArray.push(
        http.upload('/uploadChunks', blobSlice.call(file, start, end), {
          'hash': hash,
          'index': i,
          'fileType': file.type
        })
      )
    }
    // 等待所有分片上传完毕发送合并分片请求
    Promise.all(uploadPromiseArray).then(res => {
      http.post('/mergeChunks', {
        'name': hash + '.' + extension,
        'hash': hash,
        'total': chunks,
        'fileType': file.type
      })
      const uploadFile = {
        originalName: file.name,
        fileName: hash + '.' + extension,
        fileType: file.type
      }
      if (file.type.includes('image')) {
        uploadedImages.value.push(uploadFile)
      } else if (file.type.includes('video')) {
        uploadedVideos.value.push(uploadFile)
      }
    })
  }
}
// 图片预览      未完成
function handlePictureCardPreview(UploadFile: UploadFile) {
  dialogImageUrl.value = UploadFile.url!
  dialogVisible2.value = true
}
// 点击删除图片
async function handleRemove(UploadFile: UploadFile | { raw: any; }) {
  const file = UploadFile.raw || UploadFile
  const fileType = file.type || file.fileType
  let fileName = ''
  if (fileType.includes('image')) {
    // 将点击删除后新的上传文件数组数据更新
    if (file.name.match(reg)) {
      fileName = file.name.match(reg)[2]
    } else {
      fileName = file.name
    }
    uploadedImages.value = uploadedImages.value.filter((fileInfo: any) => fileInfo.originalName !== fileName)
  } else if (fileType.includes('video')) {
    if (file.name.match(reg)) {
      fileName = file.name.match(reg)[2]
    } else {
      fileName = file.name
    }
    uploadedVideos.value = uploadedVideos.value.filter((fileInfo: any) => fileInfo.originalName !== fileName)
  }
}
// 提交表单
async function submitEmit(formEl: FormInstance | undefined) {
  if (!formEl) return
  const oldFiles = oldImageFiles.value.concat(oldVideoFiles.value)
  const newFiles = uploadedImages.value.concat(uploadedVideos.value)
  const deleteFiles = oldFiles.filter((file: any | null) => file && !newFiles.some((obj: any) => obj.fileName === file.fileName))
  // 发现新上传的图片列表中有删除旧图片，发送请求给后端删除旧图
  if (deleteFiles.length > 0) {
    await removeFiles({ deleteFiles }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      const imageFiles = uploadedImages.value.map((file: any) => {
        const { originalName, ...rest } = file;
        return rest
      })
      const videoFiles = uploadedVideos.value.map((file: any) => {
        const { originalName, ...rest } = file;
        return rest
      })
      formData.value.seller_id = id
      formData.value.imageFiles = JSON.stringify(imageFiles)
      formData.value.videoFiles = JSON.stringify(videoFiles)
      formData.value.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss')
      updateProduct(formData.value).then(res => {
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

<style lang='less' scoped></style>
