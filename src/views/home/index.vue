<template>
  <div>
    <div class="test">
      我是vue3.2+vite2+vue-router4
    </div>
    <button @click="cli">点击</button>
    <div class="div1">
      <div class="div2">
        <!-- {{ store.count }} -->
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, getCurrentInstance } from 'vue'
import { useLoginStore } from '@/store/login'
import { storeToRefs } from 'pinia'
import { log } from 'console'

let instance: any = getCurrentInstance()
const http = instance.proxy.$request()
const useStore = useLoginStore();
const { token } = storeToRefs(useStore);
const cli = () => {
  http.get('/mysql').then((res: any) => {
  })
}


</script>

<style lang='less' scoped></style>