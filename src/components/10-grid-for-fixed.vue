<template>
  <my-table
    :columns="columns"
    ref="tableRef"
    :rows="rows"
    :data="data"
  ></my-table>
</template>
<script setup>
import { computed, ref, unref, onMounted } from "vue";
import { okr } from "@/utils/okr.js";
import MyTable from "@/components/MyTable-3/10-grid-for-fixed";

const columns = ref([
  {
    width: 150,
    title: "objectiveContent",
    fixed: 'left'
  },
  {
    width: 150,
    title: "objectiveDescription",
    fixed: 'left'
  },
  {
    width: 150,
    title: "krContent",
    fixed: 'left'
  },
  {
    width: 150,
    title: "indicator",
    fixed: 'left'
  },
  {
    width: 150,
    title: "startDay",
    fixed: 'left'
  },
  {
    width: 150,
    title: "endDay",
    fixed: 'left'
  },
  {
    title: "2022-10-03",
    children: [
      {
        width: 150,
        title: "contnet",
      },
      {
        width: 150,
        title: "risk",
      },
      {
        width: 150,
        title: "comment",
      },
    ],
  },
  {
    title: "2022-10-22",
    children: [
      {
        width: 150,
        title: "contnet",
      },
      {
        width: 150,
        title: "risk",
      },
      {
        width: 150,
        title: "comment",
      },
    ],
  },
]);

const data = ref([]);
const rows = ref([]);
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
    rows.value.push(undefined);
  });
});
</script>