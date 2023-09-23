<template>
  <div>
    <el-button type="success" @click="showAddDialog">新增商品</el-button>
    <addProduct ref="addDialog" />
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { fetchProduct } from '@/api/Product/index'
import addProduct from './component/add.vue'

const addDialog = ref()
const showAddDialog = () => addDialog.value.showAddDialog()

const params = {
  page: 1,
  pageSize: 20
}
fetchProduct(params).then(res=>{
  console.log(res);
})

</script>

<style lang='less' scoped></style>
