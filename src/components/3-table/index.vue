<template>
 <div ref="tabelRef" class="container">
  <div  class="table">
    <div class="header row">
      <div class="col" v-for="(col, index) in columns" :key="index" :style="{ 'flex-basis': `${col.width}px`, 'flex-grow': col.width ? 0: 1 , 'height': `${col.height}px`}" :index="index">
        <div class="right"></div>
      </div>
    </div>
    <div class="body">
      <div class="row" v-for="(row, m) in rows" :key="m"> 
        <div class="col" v-for="(col, index) in columns" :key="index" :style="{ 'flex-basis': `${col.width}px`, 'flex-grow': col.width ? 0: 1 , 'height': `${row.height}px`}" :index="m">
          <div class="bottom" v-if="index === 0"></div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script setup>
import useDrag from './dragForTable'

const {
  originClientX,
  originClientY,
  tabelRef,
  columns,
  rows
} = useDrag()



</script>
<style lang="less" scoped>
.container {
  padding: 40px;
  border: 1px solid yellow;
  overflow: scroll;
}
.table {
  width: 600px;
  padding: 0 40px;
  overflow: scroll;
}

.col {
  width: 60px;
  height: 50px;
  flex-grow: 1;
  flex-shrink: 0;
  border-right: 1px solid red;
  border-bottom: 1px solid red;
  &:first-child {
    border-left: 1px solid red;
  }
  position: relative;
  .bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    cursor: row-resize;
    &:hover {
      background: red;
    }
  }
  .right {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    cursor: col-resize;
    &:hover {
      background: red;
    }
  }
}

.header {
  & .col {
      border-top: 1px solid red;
  }
}

.row {
  display: flex;
}
</style>