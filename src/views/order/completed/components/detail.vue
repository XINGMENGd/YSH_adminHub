<template>
  <el-drawer v-model="drawer" title="商品详情">
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
      <span>{{ categoryList[productInfo.category - 1]?.label || '暂无数据' }}</span>
    </div>
    <div class="detailItem">
      <label for="Status" class="itemLabel">商品状态:</label>
      <span>{{ statusList[productInfo.status - 1]?.label || '暂无数据' }}</span>
    </div>
    <div class="detailItem">
      <label for="ImageArray" class="itemLabel">商品图:</label>
      <div class="ItemImagesBox">
        <el-image class="ItemImages" v-for="(item, index) in productInfo.imageArray" :src="item"
          :preview-src-list="productInfo.imageArray" :initial-index="index" fit="cover" hide-on-click-modal />
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const { categoryList, statusList } = defineProps<{ categoryList: any, statusList: any }>()
const drawer = ref(false)
const productInfo = ref({
  name: "",
  description: "", // 商品描述
  price: 1,
  stock: 1, // 商品库存
  category: 0, // 商品分类
  imageArray: [] as any[],
  status: 0,
  sellerId: 0,
  created_at: ''
})
const showDrawer = (row: any) => {
  productInfo.value = row
  drawer.value = true
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
}
</style>
