<template>
  <input type="file" ref="uploadInputRef" accept="video/*" @change="changeFiles">
  <div class="uploadVideoBox" v-if="uploadVideoFiles.length == 0" @click="handleChangeFiles">
    <Plus class="uploadVideoIcon" />
  </div>
  <div class="videoBox" v-else>
    <Close class="icon-close" @click="onRemove(uploadVideoFiles)" />
    <video style="width: 100%;height: 100%;" ref="videoRef" controls></video>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, computed } from 'vue'

const emit = defineEmits(['update:fileList'])
const props = defineProps<{ fileList: any, httpRequest: Function, beforeUpload: Function, onRemove: Function }>()
const uploadInputRef = ref() // 上传input实例
const videoRef = ref() // 视频容器实例
const uploadVideoFiles = computed({
  get: () => props.fileList,
  set: (value) => emit('update:fileList', value)
})
nextTick(() => { uploadInputRef.value.className = 'hideInput' })
// 点击触发input弹出文件选择器
function handleChangeFiles() { uploadInputRef.value.click() }
async function changeFiles() {
  const files = uploadInputRef.value.files // 获取选中文件信息
  // const flag = await props.beforeUpload(files[0])
  uploadVideoFiles.value = files[0]
  props.httpRequest(files[0])
  // if (flag) {
  //   emit('uploadFile', files[0], (err: any, file: any, uploadFile: any) => {
  //     console.log(file);

  //     const reader = new FileReader()
  //     reader.readAsDataURL(file)
  //     reader.onloadend = function (e) {
  //       uploadVideo.value = uploadFile
  //       nextTick(() => {
  //         const result = e.target?.result
  //         videoRef.value.src = result
  //       })
  //     }
  //   })
  // }
}
</script>

<style lang="less" scoped>
.hideInput {
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
}

.videoBox {
  position: relative;
  width: 100%;
  height: 160px;

  .icon-close {
    position: absolute;
    right: 10px;
    top: 4px;
    width: 1.6em;
    height: 1.6em;
    z-index: 99;

    &:hover {
      cursor: pointer;
    }
  }
}

.uploadVideoBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 148px;
  height: 148px;
  background-color: #fafafa;
  border: 0.8px dashed #cdd0d6;
  border-radius: 8px;

  &:hover {
    border-color: #409eff;
    cursor: pointer;

    .uploadVideoIcon {
      color: #409eff;
    }
  }

  .uploadVideoIcon {
    width: 2em;
    height: 2em;
  }
}
</style>