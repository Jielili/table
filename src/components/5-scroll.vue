
<template>
<div ref="scrollRef" class="scroll"></div>
</template>
<script setup> 
import { unref } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
const scrollRef = ref()
const originClientX = ref(0)
const windowWidth = window.innerWidth
// onMounted(() => {
//   const scroll = unref(scrollRef)
//   scroll.addEventListener('mousedown', (e) => {
//     originClientX.value = e.clientX
//     scroll.addEventListener('mousemove', mousemoveHandler)
//     document.addEventListener('mouseup', () => {
//       scroll.removeEventListener('mousemove', mousemoveHandler)
//     })
//   })
// })

// console.log()
// const mousemoveHandler = (e) => {
//   const { clientX } = e
//   if(clientX > windowWidth) {
//     console.log(clientX)
//     const moveDistance = clientX - originClientX.value
//     document.documentElement.scrollLeft = document.documentElement.scrollLeft + moveDistance
//   }
//   originClientX.value = clientX
// }

</script>
<style lang="less" scoped>
.scroll {
  width: 3000px;
  height: 100px;
  border: 1px solid red;
  cursor: grab;
}
</style>