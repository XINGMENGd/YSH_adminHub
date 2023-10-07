<template>
  <div>
    <div class="test">
      我是vue3.2+vite2+vue-router4
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useTable } from '@/hooks/useTable'
import { useProductCategory } from '@/hooks/useProductCategory'
import { useProductStatus } from '@/hooks/useProductStatus'

// 获取表格数据及商品状态列表
const { tableData, currentPage, pageSize, total, fetchData, sortChange } = useTable({ url: '/getProductList', initialPageSize: 5000 })
const { productCategoryList } = useProductCategory()
const { productStatusList } = useProductStatus()
</script>

<style lang='less' scoped></style>
