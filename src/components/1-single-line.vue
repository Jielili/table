<template>
  <div ref="rectangleRef">
    <div class="rectangle">
      <div class="right"></div>
    </div>
  </div>
</template>
<script setup>
import { unref } from "vue";
import { onMounted } from "vue";
import { ref } from "vue";
const rectangleRef = ref();
const originClientY = ref(0);
const originClientX = ref(0);

onMounted(() => {
  const rectangle = unref(rectangleRef)
  rectangle.addEventListener("mousedown", (e) => {
    const { target } = e;

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
    }
  });
});

const changeCursorToResize = (direction) => {
  document.documentElement.style.cursor = `${direction}-resize`;
};

const restCursor = () => {
  document.documentElement.style.cursor = "";
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