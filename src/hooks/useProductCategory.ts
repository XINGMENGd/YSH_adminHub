import { ref, watch, onMounted } from "vue";
import http from "@/utils/http";

export function useProductCategory(params: any = {}) {
  // 获取商品分类列表
  const {
    url,
  } = params
  const productCategoryList = ref([] as any)
  const showProductCategoryList = ref([] as any)
  const loading = ref(false) // 是否正在加载数据

  // 发起请求获取表格数据
  const fetchData = async () => {
    try {
      loading.value = true
      const response: any = await http.get(url)
      for (const item of response.data) {
        showProductCategoryList.value[item.value] = item
      }
      productCategoryList.value = response.data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  // 监听分页、排序参数的变化，重新获取数据
  // watch([currentPage, pageSize, sortBy, sortDirection], () => {
  //   fetchData()
  // })

  // 在组件挂载时自动发起请求获取数据
  onMounted(fetchData)

  return {
    productCategoryList,
    showProductCategoryList,
    loading,
    fetchData,
  }
}
