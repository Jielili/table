<template>
  <div ref="tabelRef" class="table">
    <div class="row" v-for="row in 3" :key="row">
      <div class="rectangle" v-for="col in 3" :key="col">
        <div class="right" v-if="row === 1"></div>
        <div class="bottom" v-if="col === 1">
          <div class="line"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, unref } from "vue";
import { ref } from "vue";
const originClientY = ref(0);
const originClientX = ref(0);
const tabelRef = ref();

onMounted(() => {
  const table = unref(tabelRef)
  table.addEventListener("mousedown", (e) => {
    const { target } = e;
    if (target.className === "bottom") {
      changeCursorToResize("row");
      // const height = target.parentNode.clientHeight
      originClientY.value = e.clientY;
      const fn = mousemoveHandlerForRow(target.parentNode);
      table.addEventListener("mousemove", fn);
      table.addEventListener("mouseup", () => {
        table.removeEventListener("mousemove", fn);
        restCursor();
      });
    }

    if (target.className === "right") {
      changeCursorToResize("col");
      // const width = target.parentNode.clientWidth
      originClientX.value = e.clientX;
      const fn = mousemoveHandlerForCol(target.parentNode);
      table.addEventListener("mousemove", fn);
      table.addEventListener("mouseup", () => {
        table.removeEventListener("mousemove", fn);
        restCursor();
      });
    }
  });
});

const changeCursorToResize = (direction) => {
  document.documentElement.style.cursor = `${direction}-resize`;
};

const restCursor = () => {
  document.documentElement.style.cursor = "";
};

const mousemoveHandlerForRow = (el) => {
  return (e) => {
    const clientY = e.clientY;
    const moveDistance = clientY - originClientY.value;
    el.style.height = el.clientHeight + moveDistance + "px";
    originClientY.value = clientY;
  };
};

const mousemoveHandlerForCol = (el) => {
  return (e) => {
    const clientX = e.clientX;
    const moveDistance = clientX - originClientX.value;
    el.style.width = el.clientWidth + moveDistance + "px";
    originClientX.value = clientX;
  };
};
</script>
<style lang="less" scoped>
.row {
  display: flex;
}
.rectangle {
  width: 50px;
  height: 50px;
  border: 1px solid red;
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
</style>