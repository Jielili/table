import { defineComponent, toRefs, ref } from 'vue'
import classes from '@/assets/styles/my-table.module.less'
import useResizeColumnsWidth from './useResizeColumnsWidth'
import useResizeRowsHeight from './useResizeRowsHeight'
import MyBody from './body'
import MyHeader from './header'
import useRows from './useRows'
import useColumns from './useColumns'
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
  setup (props) {
    const { columns, data } = toRefs(props)
    const leftBodyRef = ref()
    const mainBodyRef = ref()
    const tableRef = ref()
    const resizeLineVerticalRef = ref()
    const resizeLineHorizontalRef = ref()
    const resizeLineVerticalBolderRef = ref()
    const resizeLineHorizontalBolderRef = ref()
    const { rowsHeight, gridTemplateRows } = useRows(
      data,
      leftBodyRef,
      mainBodyRef
    )
    const {
      columnsWidth,
      leftColumns,
      mainColumns,
      leftGridTemplateColumns,
      mainGridTemplateColumns
    } = useColumns(columns)
    useResizeColumnsWidth(tableRef, columnsWidth, resizeLineVerticalRef, resizeLineVerticalBolderRef)
    useResizeRowsHeight(tableRef, rowsHeight, resizeLineHorizontalRef, resizeLineHorizontalBolderRef)

    return () => (
      <div className={classes.container}>
        <div className={classes.table} ref={tableRef}>
          <div className={[classes.header]}>
            <div className={classes['left-header']}>
              <MyHeader
                columns={leftColumns.value}
                columnsWidth={columnsWidth.value}
              ></MyHeader>
            </div>
            <div className={classes['main-header']}>
              <MyHeader
                columns={mainColumns.value}
                columnsWidth={columnsWidth.value}
              ></MyHeader>
            </div>
          </div>
          <div className={[classes.body]}>
            <div
              className={classes['left-body']}
              ref={leftBodyRef}
              style={{
                'grid-template-rows': gridTemplateRows.value,
                'grid-template-columns': leftGridTemplateColumns.value
              }}
            >
              <MyBody columns={leftColumns.value} data={data.value}></MyBody>
            </div>
            <div
              className={classes['main-body']}
              ref={mainBodyRef}
              style={{
                'grid-template-rows': gridTemplateRows.value,
                'grid-template-columns': mainGridTemplateColumns.value
              }}
            >
              <MyBody columns={mainColumns.value} data={data.value}></MyBody>
            </div>
          </div>
        </div>
        <div ref={ resizeLineVerticalRef } className={ [classes['resize-line-vertical']]}></div>
        <div ref={ resizeLineHorizontalRef } className={ [classes['resize-line-horizontal']]}></div>
        <div ref={ resizeLineVerticalBolderRef } className={ [classes['resize-line-vertical'], classes['resize-line-vertical-bolder']].join(' ')}></div>
        <div ref={ resizeLineHorizontalBolderRef } className={ [classes['resize-line-horizontal'], classes['resize-line-horizontal-bolder']].join(' ')}></div>
      </div>
    )
  }
})
