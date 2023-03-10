import { defineComponent, toRefs, computed, ref, onMounted } from 'vue'
import classes from '@/assets/grid-for-fixed.module.less'
export default defineComponent({
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    }, 
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const { columns, data } = toRefs(props)
    const leftBodyRef = ref()
    const rightBodyRef = ref()
    const leftColumns = computed(() =>columns.value.filter(item => item.fixed === 'left'))
    const mainColumns = computed(() =>columns.value.filter(item => !item.fixed))
    const rows = ref(new Array(data.value.length).fill(undefined))

    const getHeaderWidth = (cols) => {
      return cols.map((col) => (
        col.children && col.children.length ? `${col.children.reduce((pre,cur) => pre+cur.width, 0)}px` :`${col.width}px`
      )).join(" ")
    }

    const getBodyWidth = (cols) => {
      return cols.map((col) => (
        col.children && col.children.length ? getBodyWidth(col.children) :`${col.width}px`
      )).join(" ")
    }

    const leftHeaderGridTemplateColumns = computed(() => getHeaderWidth(leftColumns.value))
    const mainHeaderGridTemplateColumns = computed(() => getHeaderWidth(mainColumns.value))
    const leftBodyGridTemplateColumns = computed(() => getBodyWidth(leftColumns.value))
    const mainBodyGridTemplateColumns = computed(() => getBodyWidth(mainColumns.value))
    const gridTemplateRows = computed(() => rows.value.map(item => item ? `${item}px`: 'max-content').join(' '))



    const generateHeaderItems = (cols) => {
      return cols.reduce((pre, cur) => {
        pre.push(
          'children' in cur && cur.children.length ?
            <div className={!('children' in cur) &&classes.item}>
              <div className={classes.item}>{cur.title}</div>
              <div className={classes['header-grid']}>
                {generateHeaderItems(cur.children)}
              </div>
            </div> :
            <div className={classes.item}>
              {cur.title}
            </div>
        )
        return pre
      }, [])
    }

    const generateDataItems = (cols) => {
      const items = []
      cols.forEach((col, i) => {
        if (col.children && col.children.length) {
          items.push(...generateDataItems(col.children))
        } else {
          data.value.forEach(item => {
            (!col.rowSpan || col.rowSpan(item)) && items.push(
              <div className={classes.item} style={ col.rowSpan && col.rowSpan(item) && {"grid-row-end": `span ${col.rowSpan(item)}`}}>
                {item[col.dataIndex] || '-'}
              </div>
            )
          })
        }
      })
      return items
    }

    const leftColumnHeaderItems = generateHeaderItems(leftColumns.value)
    const mainColumnHeaderItems = generateHeaderItems(mainColumns.value)
    const leftBodyItems = generateDataItems(leftColumns.value)
    const mainBodyItems = generateDataItems(mainColumns.value)


    onMounted(() => {
      // console.log(leftBodyRef.value.children)
      // console.log(leftBodyRef)
      // console.log(rightBodyRef.value.children)
      const rightElements = rightBodyRef.value.children
      const leftElements = leftBodyRef.value.children
      const count = rows.value.length
      const leftCount = leftElements.length
      rows.value.forEach((val, index, arr) => {
        arr[index] = Math.max(rightElements[index].offsetHeight, leftElements[leftCount-count + index].offsetHeight);
      })
    })

    return () => (
      <div className={classes.container}>
          <div className={[classes.header]}>
          <div className={classes['left-header']} style={{"grid-template-columns": leftHeaderGridTemplateColumns.value}}>
                {leftColumnHeaderItems}
              </div>
              <div className={classes['main-header']} style={{"grid-template-columns": mainHeaderGridTemplateColumns.value}}>
                  { mainColumnHeaderItems }
              </div>
          </div>
          <div className={[classes.body]}>
          <div className={classes['left-body']} ref={ leftBodyRef } style={{"grid-template-columns": leftBodyGridTemplateColumns.value, 'grid-template-rows': gridTemplateRows.value}}>
                { leftBodyItems }
              </div>
              <div className={classes['main-body']}  ref={ rightBodyRef }  style={{"grid-template-columns": mainBodyGridTemplateColumns.value, 'grid-template-rows': gridTemplateRows.value}}>
               { mainBodyItems }
              </div>
          </div>
      </div>
    )
  }
})