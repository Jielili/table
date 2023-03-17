import { ref, onMounted, watch, nextTick, computed } from 'vue'
export default function useRows (data, leftBodyRef, mainBodyRef) {
  const rowsHeight = ref({})

  data.value.forEach(item => {
    rowsHeight.value[item.krId] = undefined
  })
  const resetRowsHeight = () => {
    const mainElements = mainBodyRef.value.children
    const leftElements = leftBodyRef.value.children
    const count = Object.keys(rowsHeight.value).length
    const leftCount = leftElements.length
    Object.keys(rowsHeight.value).forEach((val, index, arr) => {
      rowsHeight.value[val] = Math.max(mainElements[index]?.offsetHeight || 0, leftElements[leftCount - count + index]?.offsetHeight || 0)
    })
  }

  onMounted(() => {
    resetRowsHeight()
  })
  watch(() => data.value.length, async () => {
    rowsHeight.value = new Array(data.value.length).fill(undefined)
    await nextTick()
    resetRowsHeight()
  })

  const gridTemplateRows = computed(() => Object.values(rowsHeight.value).map(item => item ? `${item}px` : 'max-content').join(' '))

  return {
    rowsHeight,
    gridTemplateRows
  }
}
