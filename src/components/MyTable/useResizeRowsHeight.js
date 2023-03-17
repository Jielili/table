import { onMounted, ref, unref } from 'vue'
import { restCursor, changeCursorToResize } from './cursor'
export default function useResizeRowsHeight (tableRef, rows, resizeLineHorizontalRef, resizeLineHorizontalBolderRef) {
  const originClientY = ref(0)
  let offestXToTable = 0
  onMounted(() => {
    const table = unref(tableRef)
    const tableView = table.getBoundingClientRect()
    table.addEventListener('mousedown', e => {
      const { target } = e
      if (target.className.indexOf('bottom') >= 0) {
        changeCursorToResize('row')
        originClientY.value = e.clientY
        // resizeLineHorizontalRef
        const targetView = target.getBoundingClientRect()
        offestXToTable = targetView.top - tableView.top
        resizeLineHorizontalRef.value.style.display = 'block'
        resizeLineHorizontalRef.value.style.top = `${offestXToTable + 2}px`
        resizeLineHorizontalBolderRef.value.style.display = 'block'
        resizeLineHorizontalBolderRef.value.style.top = `${offestXToTable}px`
        resizeLineHorizontalBolderRef.value.style.left = `${targetView.left - tableView.left}px`
        resizeLineHorizontalBolderRef.value.style.width = `${targetView.width}px`
        // resizeLineHorizontalRef
        const fn = mousemoveHandlerForRow(target.parentNode)
        table.addEventListener('mousemove', fn)
        document.addEventListener('mouseup', () => {
          table.removeEventListener('mousemove', fn)
          resizeLineHorizontalRef.value.style.display = 'none'
          resizeLineHorizontalBolderRef.value.style.display = 'none'
          restCursor()
        }, { once: true })
        document.addEventListener('mouseleave', () => {
          table.removeEventListener('mousemove', fn)
          resizeLineHorizontalRef.value.style.display = 'none'
          resizeLineHorizontalBolderRef.value.style.display = 'none'
          restCursor()
        }, { once: true })
      }
    })
  })
  const mousemoveHandlerForRow = el => {
    return e => {
      const clientY = e.clientY
      const moveDistance = clientY - originClientY.value
      const index = Number(el.attributes.bottomIndex.value)
      rows.value[index] = el.offsetHeight + moveDistance
      // resizeLineHorizontalRef begin
      offestXToTable += moveDistance
      resizeLineHorizontalRef.value.style.top = `${offestXToTable + 2}px`
      resizeLineHorizontalBolderRef.value.style.top = `${offestXToTable}px`
      // resizeLineHorizontalRef end
      originClientY.value = clientY
    }
  }
}
