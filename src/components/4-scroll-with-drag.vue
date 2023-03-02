<template>
  <div class="container" ref="rectangleRef">
    <div class="rectangle">
      <div class="right"></div>
    </div>
    <div class="rectangle">
      <div class="right"></div>
    </div>
  </div>
</template>
<script setup>
import { unref, onMounted, ref } from "vue";
import { changeCursorToResize, restCursor } from '@/utils/drag.js'
const rectangleRef = ref();
const originClientY = ref(0);
const originClientX = ref(0);
let scrollLeft = rectangleRef.scrollLeft

onMounted(() => {
  const rectangle = unref(rectangleRef)
  rectangle.addEventListener("mousedown", (e) => {
    const { target } = e;
    scrollLeft = document.documentElement.scrollLeft

    if (target.className === "right") {
      changeCursorToResize("col");
      // const width = target.parentNode.clientWidth
      originClientX.value = e.clientX;
      const fn = mousemoveHandlerForCol(target.parentNode);
      rectangle.addEventListener("mousemove", fn);
      rectangle.addEventListener("mouseup", () => {
        rectangle.removeEventListener("mousemove", fn);
        restCursor();
      });
      document.addEventListener('mouseleave', () => {
        rectangle.removeEventListener("mousemove", fn);
        restCursor();
      })
    }
  });
});

const windowWidth = window.innerWidth

const mousemoveHandlerForCol = (el) => {
  const offestRight = rectangleRef.value.offsetLeft + rectangleRef.value.offsetWidth;
  return (e) => {
    const clientX = e.clientX;
    const moveDistance = clientX - originClientX.value;
    el.style.width = el.clientWidth + moveDistance + "px";
    originClientX.value = clientX;
  };
};
</script>
<style lang="less" scoped>
.container {
  width: 400px;
  height: 60px;
  overflow: scroll;
  border: 1px solid green;
  padding: 0 30px;
  display: flex;
}
.rectangle {
  width: 50px;
  height: 50px;
  border: 1px solid red;
  position: relative;
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