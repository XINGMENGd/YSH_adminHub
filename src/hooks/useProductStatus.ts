import { ref, watch, onMounted } from "vue";
import defHttp from "@/utils/http";

export function useProductStatus(params: any = {}) {
  // 获取商品状态列表
  const {
    url,
  } = params
  const productStatusList = ref([] as any)
  const showProductStatusList = ref([] as any)
  const loading = ref(false) // 是否正在加载数据

  // 发起请求获取表格数据
  const fetchData = async () => {
    try {
      loading.value = true
      const response: any = await defHttp.get({ url })
      for (const item of response.data) {
        showProductStatusList.value[item.value] = item
      }
      productStatusList.value = response.data
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
    productStatusList,
    showProductStatusList,
    loading,
    fetchData,
  }
}
