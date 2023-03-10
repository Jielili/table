import { onMounted, unref, ref } from "vue";
import { changeCursorToResize, restCursor } from '@/utils/drag.js'

export default function useDrag () {

  const originClientX = ref(0);
  const originClientY = ref(0);
  const tabelRef = ref();

  const columns = ref([
    {
      width: 100,
      index: 'objectConent',
      rowSpan: 2,
    },
    {
      width: 100,
      index: 'objectDescription',
    },
    {
      width: 100,
      index: 'krContent',
    },
    {
      width: 100,
      index: 'indicator',
    },
    {
      width: 100,
      index: 'startTime',
    },
    {
      width: 100,
      index: 'endTime',
    },
    {
      width: 100,
      index: '2022111progress',
    },
    {
      width: 100,
      index: '2022111risk',
    },
    {
      width: 100,
      index: '2022111comment',
    },
    {
      width: 100,
      index: '2022120progress',
    },
    {
      width: 100,
      index: '2022120risk',
    },
    {
      width: 100,
      index: '2022120comment',
    }
  ])
  const rows = ref([
    {
      height: 50
    },
    {
      height: 50
    },
    {
      height: 50
    },
    {
      height: 50
    },
  ])

  onMounted(() => {
    const table = unref(tabelRef)
    table.addEventListener("mousedown", (e) => {
      const { target } = e;

      if (target.className === "right") {
        changeCursorToResize("col");
        originClientX.value = e.clientX;
        const fn = mousemoveHandlerForCol(target.parentNode);
        table.addEventListener("mousemove", fn);
        table.addEventListener("mouseup", () => {
          table.removeEventListener("mousemove", fn);
          restCursor();
        });
        document.addEventListener('mouseleave', () => {
          table.removeEventListener("mousemove", fn);
          restCursor();
        })
      }

      if (target.className === "bottom") {
        changeCursorToResize("row");
        originClientY.value = e.clientY;
        const fn = mousemoveHandlerForRow(target.parentNode);
        table.addEventListener("mousemove", fn);
        table.addEventListener("mouseup", () => {
          table.removeEventListener("mousemove", fn);
          restCursor();
        });
        document.addEventListener('mouseleave', () => {
          table.removeEventListener("mousemove", fn);
          restCursor();
        })
      }
    });
  });

  const mousemoveHandlerForRow = (el) => {
    return (e) => {
      const clientY = e.clientY;
      const moveDistance = clientY - originClientY.value;
      const index = Number(el.attributes.index.value)
      rows.value[index].height = el.offsetHeight + moveDistance
      originClientY.value = clientY;
    };
  };

  const mousemoveHandlerForCol = (el) => {
    return (e) => {
      const clientX = e.clientX;
      const moveDistance = clientX - originClientX.value;
      const index = Number(el.attributes.index.value)
      columns.value[index].width = el.offsetWidth + moveDistance
      originClientX.value = clientX;
    };
  };


  return {
    originClientX,
    originClientY,
    tabelRef,
    columns,
    rows
  }
}