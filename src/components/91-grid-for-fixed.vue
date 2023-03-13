<template>
  <div class="table">
    <div class="header">
      <div class="left-header">
        <div class="item" v-for="n in 3" :key="n">
          <div :class="['content', `item-${n}`]"></div>
        </div>
      </div>
      <div class="right-header">
        <div class="item" v-for="n in 15" :key="n">
          <div :class="['content', `item-${n}`]"></div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="left-body" :style="{ 'grid-template-rows': gridTemplateRows }">
        <div :class="['item', `item-${n}-parent`]" v-for="n in 11" :key="n">
          <div :class="['content', `item-${n}`]"></div>
        </div>
      </div>
      <div class="right-body"  :style="{ 'grid-template-rows': gridTemplateRows }">
        <div class="item" v-for="n in 60" :key="n">
          <div :class="['content', `item-${n}`]"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
const rows = ref([undefined, undefined, undefined, undefined]);
const gridTemplateRows = computed(() =>
  rows.value.map((item) => (item ? `${item}px` : "max-content")).join(" ")
);
onMounted(() => {
  const rightElements = [
    ...document.getElementsByClassName("right-body")[0].children,
  ];
  const leftElements = [
    ...document.getElementsByClassName("left-body")[0].children,
  ]
  console.log(rightElements);
  console.log(document.getElementsByClassName("left-body"))
  rows.value.forEach((val, index, arr) => {
    arr[index] = Math.max(rightElements[index].offsetHeight, leftElements[index].offsetHeight);
  });
  console.log();
});
</script>
<style lang="less" scoped>
.content {
  height: 100px;
  width: 100px;
}

.left-body{
  .item-2 {
    height: 160px;
  }
  .item-5 {
    height: 120px;
  }
  .item-1 {
    height: 400px;
  }
  .item-1-parent {
    grid-row-end: span 2;
  }
}


.table {
  position: relative;
  width: 1000px;
  height: 400px;
  overflow: scroll;
}

.header,
.body {
  display: flex;
  // position: relative;
}

.header {
  position: sticky;
  top: 0;
  z-index: 1;
}


.left-header{
  grid-template-columns: repeat(4, max-content);
  position: sticky;
  left: 0;
}

.left-header,
.right-header {
  display: grid;
  grid-auto-flow: column;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  grid-auto-rows: max-content;
  grid-auto-columns: max-content;
  .item {
    background: #5cb3cc;
  }
}

.left-body {
  position: sticky;
  left: 0;
  grid-auto-flow: column;
  display: grid;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  grid-template-columns: repeat(4, max-content);
  .item {
    background: #f8df70;
  }
}


.right-body {
  grid-auto-flow: column;
  display: grid;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  grid-auto-columns: max-content;
  // grid-template-columns: repeat(6, max-content);
  .item {
    background: #f0a1a8;
  }

  .item-5 {
    height: 200px;
  }

  .item-14 {
    height: 120px;
  }

  .item-4 {
    height: 130px;
  }
}
</style>