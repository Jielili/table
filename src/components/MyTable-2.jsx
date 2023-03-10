import { defineComponent, unref, toRef, computed, ref, toRefs } from 'vue'
import classes from '@/assets/table.module.less'
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
    const { columns, rows, data } = toRefs(props)
    const tableStyle = computed(() => {
      const str = Object.values(columns.value.map((i) => `${i.width}px`)).join(" ");
      const heightStr = rows.value.map(item => item ? `${item.height}px`: 'max-content').join(' ')
      return {
        "grid-template-columns": str,
        "grid-template-rows": `50px ${heightStr}`,
      };
    });
    
    const items = ref({})
    columns.value.forEach((col, colIndex) => {
      let p = -1
      items.value[col.name] = [
        <div className={classes.item} index={colIndex}>
          { col.name }
          <div className={classes.right}></div>
        </div>
      ]
      data.value.forEach((row, i) => {
        if ((!'rowSpan' in col) || i > p) {
          items.value[col.name].push(
            <div className={classes.item} style={'rowSpan' in col && { "grid-row-end": `span ${col.rowSpan(row)}` }} bottomIndex={ col.name === 'krContent' && i }>
              {row[col.name]}
              {col.name === 'krContent' && <div className={classes.bottom} ></div>}
            </div>
          )
          if ('rowSpan' in col) {
            p += col.rowSpan(row)
          }
        }
      })
    })
    return () => (
      <div className={classes.table} style={ tableStyle.value }>
        {
          ...Object.values(items.value)
        }
      </div>
    )
  }
})