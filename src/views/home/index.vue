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
    const arr = mapRoute(res)
    console.log(arr);
  })
}
const mapRoute = (route: any, childr: any = "") => {
  const child = {
    "id": 3,
    "name": "menu1-1",
    "roles": "00",
    "children_id": null
  }
  const a = route.map((item: any, index: any) => {
    if (item.children) {

      const arr = item.children.map((it1: any, in1: any) => {
        if (child.id == it1.id && it1.name != "") {
          it1 = child
        } else {
          // return mapRoute(route, item)
        }
        return it1
      })
      // console.log(arr,'arr') ;
      
      return arr
    }
    console.log(item,'item');

    return item
  })
  console.log(a);

  return route
}


</script>

<style lang='less' scoped></style>