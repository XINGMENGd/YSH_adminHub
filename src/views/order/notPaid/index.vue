<template>
  <el-upload v-model:file-list="fileList" action="http://localhost:3000/nodeMock/upload" list-type="picture-card"
    :on-success="handlerSuccess" :on-remove="handleRemove">
    <Plus style="width: 2em; height: 2em;" />
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { removeImages } from '@/api/common/index'

const fileList = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile) => {
  const filesArr: string[] = []
  const fileFormat = uploadFile.name.split('.')
  const extension = fileFormat[fileFormat.length - 1]; // 图片后缀
  calculateHash(uploadFile.name).then(hash => {
    filesArr.push(hash + '.' + extension)
    removeImages({ filesArr }).then(res => {
      console.log(res);
    })
  })


}
async function calculateHash(inputString: any) {
  const encoder = new TextEncoder();
  const data = encoder.encode(inputString);
  const digest = await crypto.subtle.digest('SHA-256', data);

  const hashArray = Array.from(new Uint8Array(digest));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

const handlerSuccess: UploadProps['onSuccess'] = (response, uploadFile, uploadFiles) => {
  console.log(uploadFiles);
}
</script>
