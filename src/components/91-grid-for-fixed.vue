<template>
  <div class="table">
    <div class="header">
      <div class="left-header">
        <div class="item" v-for="n in 3" :key="n">
          <div :class="['content', `item-${n}`]"></div>
        </div>
      </div>
      <div class="right-header">
        <div class="item" v-for="n in 10" :key="n">
          <div :class="['content', `item-${n}`]"></div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="left-body"  :style="{ 'grid-template-rows': gridTemplateRows }">
        <div class="item" v-for="n in 12" :key="n">
          <div :class="['content', `item-${n}`]"></div>
        </div>
      </div>
      <div class="right-body"  :style="{ 'grid-template-rows': gridTemplateRows }">
        <div class="item" v-for="n in 40" :key="n">
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
}


.table {
  position: relative;
  width: 1000px;
  height: 400px;
  overflow: scroll;
}

// .header {
//   position: sticky;
//   top: 0;
// }

.header,
.body {
  display: flex;
}


.left-header {
  left: 0;
  z-index: 2;
}

.left-body {
  position: sticky;
  left: 0;
  z-index: 1;

}

.left-header,
.right-header {
  display: grid;
  grid-auto-flow: column;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  grid-auto-rows: max-content;
  grid-auto-columns: max-content;
  position: sticky;
  top: 0;
  .item {
    background: #5cb3cc;
  }
}

.left-body {
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
}
</style>