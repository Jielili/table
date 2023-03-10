<template>
  <my-table2 :columns="okrColumns" ref="tableRef" :rows="rows" :data="data"></my-table2>
  <my-table2 :columns="weekColumns" ref="tableRef" :rows="rows" :data="data"></my-table2>
</template>
<script setup>
import { changeCursorToResize, restCursor } from "@/utils/drag.js";
import { computed, ref, unref, onMounted } from "vue";
import { okr } from "@/utils/okr.js";
import MyValue from "@/components/MyValue.jsx";
import MyTable2 from "@/components/MyTable-2.jsx";
import MyTable from "@/components/MyTable.jsx";

const okrColumns = ref([
  {
    width: 150,
    name: "objectiveContent",
    rowSpan: (o) => o.krCount,
  },
  {
    width: 150,
    name: "objectiveDescription",
    rowSpan: (o) => o.krCount,
  },
  {
    width: 150,
    name: "krContent",
  },
  {
    width: 150,
    name: "indicator",
  },
  {
    width: 150,
    name: "startDay",
  },
  {
    width: 150,
    name: "endDay",
  },
]);


const weekColumns = ref([
  {
    width: 150,
    name: "2022-10-03-contnet",
  },
  {
    width: 150,
    name: "2022-10-03-risk",
  },
  {
    width: 150,
    name: "2022-10-03-coment",
  },
  {
    width: 150,
    name: "2022-10-22-contnet",
  },
  {
    width: 150,
    name: "2022-10-22-risk",
  },
  {
    width: 150,
    name: "2022-10-22-coment",
  },
])

const weekData = ref([])
const originClientX = ref(0);
const originClientY = ref(0);
const tableRef = ref(null);

const data = ref([]);
const rows = ref([])
okr.forEach((o, index) => {
  o.keyResults.forEach((kr) => {
    data.value.push({
      objectiveContent: o.content,
      objectiveDescription: index,
      krContent: kr.content,
      indicator: "indicator",
      startDay: "startDay",
      endDay: "endDay",
      progress: kr.progress,
      krCount: o.keyResults.length,
    });
    rows.value.push(undefined)
    weekData.value.push({})
  });
});

onMounted(() => {
  const table = unref(tableRef).$el;
  table.addEventListener("mousedown", (e) => {
    const { target } = e;
    if (target.className.indexOf("right") >= 0) {
      changeCursorToResize("col");
      originClientX.value = e.clientX;
      const fn = mousemoveHandlerForCol(target.parentNode, okrColumns);
      table.addEventListener("mousemove", fn);
      table.addEventListener("mouseup", () => {
        table.removeEventListener("mousemove", fn);
        restCursor();
      });
      document.addEventListener("mouseleave", () => {
        table.removeEventListener("mousemove", fn);
        restCursor();
      });
    }

    if (target.className.indexOf("bottom") >= 0) {
      changeCursorToResize("row");
      originClientY.value = e.clientY;
      const fn = mousemoveHandlerForRow(target.parentNode);
      table.addEventListener("mousemove", fn);
      table.addEventListener("mouseup", () => {
        table.removeEventListener("mousemove", fn);
        restCursor();
      });
      document.addEventListener("mouseleave", () => {
        table.removeEventListener("mousemove", fn);
        restCursor();
      });
    }
  });
});

const mousemoveHandlerForRow = (el) => {
  return (e) => {
    const clientY = e.clientY;
    const moveDistance = clientY - originClientY.value;
    const index = Number(el.attributes.bottomIndex.value);
    rows.value[index] = el.offsetHeight + moveDistance;
    originClientY.value = clientY;
  };
};

const mousemoveHandlerForCol = (el, columns) => {
  return (e) => {
    const clientX = e.clientX;
    const moveDistance = clientX - originClientX.value;
    const index = Number(el.attributes.index.value);
    columns.value[index].width = el.offsetWidth + moveDistance;
    originClientX.value = clientX;
  };
};
</script>
<style lang="less" scoped>
.table {
  display: grid;
  width: 1300px;
  height: 500px;
  overflow: scroll;
}

.item {
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