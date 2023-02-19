<template>
    <div>
        这是demo2
    </div>
    <div>
        {{ store.count }}
    </div>
</template>

<script setup lang='ts'>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { useTestStore } from '@/store/test';
let store = useTestStore()
console.log(store);

</script>

<style scoped lang='less'>

</style>