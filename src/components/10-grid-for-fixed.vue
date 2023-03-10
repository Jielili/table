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
const data = ref([]);
const rows = ref([]);
okr.forEach((o, index) => {
  o.keyResults.forEach((kr, krIndex) => {
    data.value.push({
      objectiveContent: o.content,
      objectiveDescription: index,
      krContent: kr.content,
      indicator: "indicator",
      startDay: "startDay",
      endDay: "endDay",
      progress: kr.progress,
      krCount: o.keyResults.length,
      krIndex
    });
    rows.value.push(undefined);
  });
});

const columns = ref([
  {
    width: 150,
    title: "objectiveContent",
    dataIndex: 'objectiveContent',
    fixed: 'left',
    rowSpan: (o) => (!o.krIndex && o.krCount) || 0
  },
  {
    width: 150,
    title: "objectiveDescription",
    dataIndex: 'objectiveDescription',
    fixed: 'left',
    rowSpan: (o) => (!o.krIndex && o.krCount) || 0
  },
  {
    width: 150,
    title: "krContent",
    dataIndex: 'krContent',
    fixed: 'left'
  },
  {
    width: 150,
    title: "indicator",
    dataIndex: 'indicator',
    fixed: 'left'
  },
  {
    width: 150,
    title: "startDay",
    dataIndex: 'startDay',
    fixed: 'left'
  },
  {
    width: 150,
    title: "endDay",
    dataIndex: 'endDay',
    fixed: 'left'
  },
  {
    title: "2022-10-03",
    children: [
      {
        width: 150,
        title: "contnet",
        dataIndex: '2022-10-03-contnet',
      },
      {
        width: 150,
        title: "risk",
        dataIndex: '2022-10-03-risk',
      },
      {
        width: 150,
        title: "comment",
        dataIndex: '2022-10-03-comment',
      },
    ],
  },
  {
    title: "2022-10-22",
    children: [
      {
        width: 150,
        title: "contnet",
        dataIndex: '2022-10-22-contnet',
      },
      {
        width: 150,
        title: "risk",
        dataIndex: '2022-10-22-risk',
      },
      {
        width: 150,
        title: "comment",
        dataIndex: '2022-10-22-comment',
      },
    ],
  },
]);


</script>