<template>
  <div class="test">
    我是vue3.2+vite2+vue-router4
  </div>
  <div class="div1">
    <div class="div2">
      {{ store.count }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useTestStore } from '@/store/test';

const router = useRouter()
const route = useRoute()
const store = useTestStore()


// import { toRefs } from 'vue'
// import { storeToRefs } from 'pinia'
// import { useMainStore } from "../store";
// const mainStore = useMainStore();
// // 解构数据，但是得到的数据是不具有响应式的，只是一次性的
// // 相当于仅仅只是...mainStore而已，只是做了reactive处理，并没有做toRefs
// // const { count, info } = useMainStore();
// // 解决方法：
// // 1. 通过使用toRefs函数，因为前面所说相当于是通过reactive处理，因此可以
// // const { count, info } = toRefs(mainStore);
// // 2. 通过pinia中提供的storeToRefs方法来解决，推荐使用
// const { count, info } = storeToRefs(mainStore);
// const alertData = () => {
//   mainStore.count += 10
// }



// console.log(import.meta.env)
</script>

<style scoped lang='less'>
.test {
  color: @test-color
}

.div1 {
  color: blue;

  .div2 {
    font-size: 28px;
  }
}
</style>