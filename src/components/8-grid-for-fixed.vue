<template>
  <div class="table">
    <div class="left" :style="{'grid-template-rows': gridTemplateRows}">
      <div
        class="item"
        v-for="n in 9"
        :key="n"
      >
        <div :class="['content', `item-${n}`]"></div>
      </div>
    </div>
    <div class="right" :style="{'grid-template-rows': gridTemplateRows}">
      <div class="item" v-for="n in 57" :key="n">
        <div :class="['content',`item-${n}`]"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
const rows = ref([undefined, undefined, undefined])
const gridTemplateRows = computed(() => rows.value.map(item => item ? `${item}px`: 'max-content').join(' '))
onMounted(() => {
  const rightElements = [...document.getElementsByClassName('right')[0].children]
  rows.value.forEach((val, index, arr) => {
    console.log(rightElements[index].offsetHeight)
    arr[index] = rightElements[index].offsetHeight
  })
})
</script>
<style lang="less" scoped>
.content {
  height: 100px;
  width: 100px;
}

.item-2{
  height: 160px;
}

.item-4{
  height: 120px;
}

.table {
  width: 1000px;
  overflow: scroll;
}

.left {
  // position: sticky;
  // left: 0;
  // top: 0;
  position: absolute;
  grid-auto-flow: column;
  display: grid;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  grid-template-columns: repeat(3, max-content);
  .item {
    background: #2177b8;
  }
}

.right {
  grid-auto-flow: column;
  display: grid;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  grid-template-columns: repeat(6, max-content);
  .item {
    background: #f0a1a8;
  }

  .item-4 {
    height: 200px;
  }

  .item-11 {
    height: 120px;
  }
  
}
</style>