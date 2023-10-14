import { onMounted, onUnmounted, watch, ref, nextTick, provide } from "vue";

export function useWindowResize() {
  const main = ref()
  const search = ref()
  const table = ref()
  const pagination = ref()
  const width = ref(0);
  const tableHeight = ref(0);

  function onResize() {
    width.value = window.innerWidth;

    nextTick(() => {
      const tableMarginTop = window.innerHeight * 0.02
      const mainHeight = main.value.$el.clientHeight - 40
      const searchHeight = search.value?.clientHeight || 0
      const paginationHeight = pagination.value?.$el?.clientHeight || 0

      tableHeight.value = mainHeight - searchHeight - paginationHeight - tableMarginTop
    })
  }

  onMounted(() => {
    window.addEventListener("resize", onResize);
    onResize();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });

  provide("main", main);
  provide("search", search);
  provide("table", table);
  provide("pagination", pagination);
  provide("tableHeight", tableHeight);
  provide("pagination", pagination);

  return {
    width,
    tableHeight,
    main,
    search,
    table,
    pagination,
    onResize
  };
}

