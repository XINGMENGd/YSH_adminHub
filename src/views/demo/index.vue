<template>
    <div>
        我是demo
    </div>
    <button @click="to">点击我跳转</button>
</template>

<script setup lang='ts'>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
console.log(useRouter, useRoute);
const router = useRouter()
const route = useRoute()
const to = function () {
    router.go(-1)
}
console.log(route);


</script>

<style scoped lang='less'>

</style>