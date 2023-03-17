import { onMounted, ref, unref} from 'vue'
import { changeCursorToResize, restCursor } from "@/utils/drag.js";
export default function resize(tableRef, columns, rows) {
  const originClientX = ref(0);
  const originClientY = ref(0);
  onMounted(() => {
    const table = unref(tableRef);
    table.addEventListener("mousedown", (e) => {
      const { target } = e;
      if (target.className.indexOf("right") >= 0) {
        changeCursorToResize("col");
        originClientX.value = e.clientX;
        const fn = mousemoveHandlerForCol(target.parentNode);
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
  })

  const mousemoveHandlerForRow = (el) => {
    return (e) => {
      const clientY = e.clientY;
      const moveDistance = clientY - originClientY.value;
      const index = Number(el.attributes.bottomIndex.value);
      rows.value[index] = el.offsetHeight + moveDistance;
      originClientY.value = clientY;
    };
  };
  
  const mousemoveHandlerForCol = (el) => {
    return (e) => {
      const clientX = e.clientX;
      const moveDistance = clientX - originClientX.value;
      const index = el.attributes.index.value;
      columns.value[index] = el.offsetWidth + moveDistance;
      originClientX.value = clientX;
    };
  };
}

