<template>
  <input type="file" ref="inputRef" v-if="!isUpload" accept="video/*" class="hideInput" @change="changeFiles">
  <div class="videoBox" v-if="videoFiles.length > 0 && videoFiles.length < limit" v-for="(item, index) in videoFiles"
    :key="item.name">
    <Close class="icon-close" @click="onRemove(item)" />
    <video style="width: 100%;height: 100%;" ref="videoRef" controls :src="mapVideoUrl(item)"></video>
  </div>
  <div class="videoBox" v-else v-for="(item, index) in (videoFiles.slice(0, limit))" :key="index">
    <Close class="icon-close" @click="onRemove(item)" />
    <video style="width: 100%;height: 100%;" ref="videoRef" controls :src="mapVideoUrl(item)"></video>
  </div>
  <div class="uploadVideoBox" v-if="videoFiles.length < limit" @click="handleChangeFiles">
    <Plus class="uploadVideoIcon" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue'

interface uploadOptions {
  fileList: String
  limit: Number
  httpRequest: Function
  beforeUpload: Function
  onRemove: Function
}
const props = defineProps<uploadOptions>()
const emit = defineEmits(['update:fileList'])
const limit = ref(props.limit) // 最大上传上限
const inputRef = ref() // 上传input实例
const videoRef = ref() // 视频容器实例
const isUpload = ref(false) // 是否上传过文件 -- 上传过文件后切换清除input实例，在下次点击上传时重新创建以实现input不能选择重复视频文件问题
const videoFiles = computed({
  get: () => props.fileList,
  set: (value) => emit('update:fileList', value)
}) as any

// 点击触发input弹出文件选择器
function handleChangeFiles() {
  isUpload.value = false;
  nextTick(() => inputRef.value.click())
}
// 选中上传视频文件
async function changeFiles() {
  if (props.fileList.length as any >= limit.value) { console.error('上传视频量到达上限'); return }
  const file = inputRef.value.files[0] // 获取选中文件信息
  try {
    await props.beforeUpload(file)
    await props?.httpRequest(file)
    const newVideoFiles = props.fileList.concat(file)
    videoFiles.value = newVideoFiles
    isUpload.value = true
  } catch (error) {
    console.error(error);
  }
}
// 将文件信息转换成video播放地址
function mapVideoUrl(file: any) {
  if (Object.prototype.toString.call(file).includes('File')) {
    return URL.createObjectURL(file)
  } else {
    return file.url
  }
}

</script>

<style lang="scss" scoped>
.hideInput {
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
}

.videoBox {
  position: relative;
  width: 310px;
  height: 170px;

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
  width: 310px;
  height: 170px;
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