import { defineComponent, toRefs, computed, ref, onMounted } from 'vue'
import classes from '@/assets/grid-for-fixed.module.less'
import resize from './resize'
export default defineComponent({
  props: {
    columns: {
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
    const rows = ref(new Array(data.value.length).fill(undefined))
    const columnsHeight = ref({})
    const leftBodyRef = ref()
    const rightBodyRef = ref()
    const tableRef = ref()
    const leftColumns = computed(() =>columns.value.filter(item => item.fixed === 'left'))
    const mainColumns = computed(() => columns.value.filter(item => !item.fixed))
    
    const getWidths = (cols) => {
      cols.forEach(col => {
        if ('children' in col) {
          getWidths(col.children)
        } else {
          columnsHeight.value[col.dataIndex] = col.width
        }
      })
    }

    getWidths(columns.value)
    
    resize(tableRef, columnsHeight, rows)

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
            <div className={classes.item} index={ cur.dataIndex }>
              <div style={ {width: `${columnsHeight.value[cur.dataIndex]-2}px`} }>
                {cur.title}
              </div>
              <div className={classes.right}></div>
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
          data.value.forEach((item, dataIndex) => {
            (!col.rowSpan || col.rowSpan(item)) && items.push(
              <div className={classes.item} bottomIndex={dataIndex} style={ col.rowSpan && col.rowSpan(item) && { "grid-row-end": `span ${col.rowSpan(item)}` }}>
                <div style={{ ...(!col.rowSpan && { height: `${rows.value[dataIndex] - 2}px` }), width: `${columnsHeight.value[col.dataIndex]-2}px`} }>
                  {item[col.dataIndex] || '-'}
                </div>
                {col.dataIndex === 'krContent' && <div className={classes.bottom} ></div>}
              </div>
            )
          })
        }
      })
      return items
    }


    onMounted(() => {
      const rightElements = rightBodyRef.value.children
      const leftElements = leftBodyRef.value.children
      const count = rows.value.length
      const leftCount = leftElements.length
      rows.value.forEach((val, index, arr) => {
        arr[index] = Math.max(rightElements[index].offsetHeight, leftElements[leftCount-count + index].offsetHeight);
      })
    })

    return () => (
      <div className={classes.container} ref={ tableRef }>
          <div className={[classes.header]}>
              <div className={classes['left-header']}>
                {generateHeaderItems(leftColumns.value)}
              </div>
              <div className={classes['main-header']}>
                { generateHeaderItems(mainColumns.value)}
              </div>
          </div>
          <div className={[classes.body]}>
              <div className={classes['left-body']} ref={ leftBodyRef } style={{'grid-template-rows': `repeat(${rows.value.length}, max-content)`}}>
                { generateDataItems(leftColumns.value) }
              </div>
              <div className={classes['main-body']}  ref={ rightBodyRef }  style={{ 'grid-template-rows': `repeat(${rows.value.length}, max-content)`}}>
               { generateDataItems(mainColumns.value) }
              </div>
          </div>
      </div>
    )
  }
})