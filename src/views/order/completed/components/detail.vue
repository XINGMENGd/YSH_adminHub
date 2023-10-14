<template>
  <el-drawer v-model="drawer" title="商品详情" class="common-drawer" @closed="handlerCloseDrawer">
    <div class="detailItem">
      <label for="Name" class="itemLabel">商品名称:</label>
      <span>{{ productInfo.name }}</span>
    </div>
    <div class="detailItem">
      <label for="Description" class="itemLabel">商品描述:</label>
      <span>{{ productInfo.description }}</span>
    </div>
    <div class="detailItem">
      <label for="Price" class="itemLabel">商品价格:</label>
      <span>{{ productInfo.price }}</span>
    </div>
    <div class="detailItem">
      <label for="Stock" class="itemLabel">商品库存:</label>
      <span>{{ productInfo.stock }}</span>
    </div>
    <div class="detailItem">
      <label for="Category" class="itemLabel">商品分类:</label>
      <span>{{ productCategoryList[productInfo.category]?.label || '暂无数据' }}</span>
    </div>
    <div class="detailItem">
      <label for="Status" class="itemLabel">商品状态:</label>
      <span>{{ productStatusList[productInfo.status]?.label || '暂无数据' }}</span>
    </div>
    <div class="detailItem">
      <label for="ImageArray" class="itemLabel">商品图:</label>
      <div class="ItemImagesBox">
        <el-image class="ItemImages" v-for="(item, index) in productInfo.imageFiles" :src="item.name"
          :preview-src-list="previewList" :initial-index="index" fit="scale-down" hide-on-click-modal />
      </div>
    </div>
    <div class="detailItem" v-if="productInfo.videoFiles.length > 0">
      <label for="ImageArray" class="itemLabel">商品视频:</label>
      <div class="productVideoBox">
        <video class="productVideo" ref="videoRef" :src="productInfo.videoFiles[0]?.name" controls
          @pause="videoPause"></video>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const { productCategoryList, productStatusList } = defineProps<{ productCategoryList: any, productStatusList: any }>()
const drawer = ref(false)
const productInfo = ref({
  name: "",
  description: "", // 商品描述
  price: 1,
  stock: 1, // 商品库存
  category: 0, // 商品分类
  imageFiles: [] as any[],
  videoFiles: [] as any[],
  status: 0,
  seller_id: 0,
  created_at: ''
})
const previewList = computed(() => {
  return productInfo.value.imageFiles.map(item => {
    return item.name
  })
})
const videoRef = ref() // 视频播放容器实例
function showDrawer(row: any) {
  productInfo.value = row
  drawer.value = true
}
function handlerCloseDrawer() {
  try {
    videoRef.value.pause()
  } catch (error) {
    console.log(error);
  }
}

function videoPause() {
  console.log('videoPause');
}
defineExpose({ showDrawer })
</script>

<style lang="less" scoped>
.detailItem {
  margin-bottom: 20px;

  .itemLabel {
    margin-right: 10px;
  }

  .ItemImagesBox {
    .ItemImages {
      width: 160px;
      height: 160px;
      margin-right: 6px;
      margin-top: 6px;
    }
  }

  .productVideoBox {
    width: 100%;
    height: 30%;

    .productVideo {
      width: 100%;
      height: 100%;
    }
  }


}
</style>
