import { ref, watch, onMounted } from "vue";
import http from "@/utils/http";
import type * as CT from '@/api/common/types'

export function useTable(params: any) {
  const {
    url,
    initialPage = 1,
    initialPageSize = 10,
    initialSortDirection = '',
    initialSortBy = '',
  } = params

  const tableData = ref([]) // 响应式的表格数据
  const loading = ref(false) // 是否正在加载数据
  const currentPage = ref(initialPage) // 当前页数
  const pageSize = ref(initialPageSize) // 每页显示的数量
  const total = ref(0) // 总数据条数
  const sortBy = ref(initialSortBy) // 排序字段
  const sortDirection = ref(initialSortDirection) // 排序方向

  // 发起请求获取表格数据
  const fetchData = async () => {
    try {
      loading.value = true
      const response: any = await http.get(url, {
        page: currentPage.value,
        size: pageSize.value,
        sort: sortBy.value,
        direction: sortDirection.value,
      })
      tableData.value = response.data.list
      total.value = response.data.total
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const sortChange = ({ column, prop, order }: any) => {
    sortBy.value = prop
    sortDirection.value = order == 'ascending' ? 'ASC' : order == 'descending' ? 'DESC' : ''
  }

  // 监听分页、排序参数的变化，重新获取数据
  watch([currentPage, pageSize, sortBy, sortDirection], () => {
    fetchData()
  })

  // 在组件挂载时自动发起请求获取数据
  onMounted(fetchData)

  return {
    tableData,
    loading,
    currentPage,
    pageSize,
    total,
    sortBy,
    sortDirection,
    fetchData,
    sortChange
  }
}
