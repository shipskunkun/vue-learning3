<template>
  <div class="gulu-table-wrapper" ref="wrapper">
    <div :style="{height, overflow: 'auto'}" ref="tableWrapper">
      <table class="gulu-table" :class="{bordered, compact, striped: striped}" ref="table">
        <thead>
        <tr>
          <th :style="{width: '50px'}" v-if="numberVisible">#</th>
          <th :style="{width: column.width + 'px'}" v-for="column in columns" :key="column.field">
            <div class="gulu-table-header">
              {{column.text}}
              <span v-if="column.field in orderBy" class="gulu-table-sorter" @click="changeOrderBy(column.field)">
                <g-icon name="asc" :class="{active: orderBy[column.field] === 'asc'}"/>
                <g-icon name="desc" :class="{active: orderBy[column.field] === 'desc'}"/>
              </span>
            </div>
          </th>
          <th ref="actionsHeader" v-if="$scopedSlots.default"></th>
        </tr>
        </thead>
        <tbody>
        <template v-for="(item,index) in dataSource">
          <tr :key="item.id">
            <td v-if="expendField" :style="{width: '50px'}" class="gulu-table-center">
              <g-icon class="gulu-table-expendIcon" name="right"
                @click="expendItem(item.id)"/>
            </td>
            <td v-if="checkable" :style="{width: '50px'}" class="gulu-table-center">
              <input type="checkbox" @change="onChangeItem(item, index, $event)"
                :checked="inSelectedItems(item)"
              /></td>
            <td :style="{width: '50px'}" v-if="numberVisible">{{index+1}}</td>
            <template v-for="column in columns">
              <td :style="{width: column.width + 'px'}" :key="column.field">
                <template v-if="column.render">
                  <vnodes :vnodes="column.render({value: item[column.field]})"></vnodes>
                </template>
                <template v-else>
                  {{item[column.field]}}
                </template>
              </td>
            </template>
            <td v-if="$scopedSlots.default">
              <div ref="actions" style="display: inline-block;">
                <slot :item="item"></slot>
              </div>
            </td>
          </tr>
          <tr v-if="inExpendedIds(item.id)" :key="`${item.id}-expend`">
            <td :colspan="columns.length + expendedCellColSpan">
              {{item[expendField] || '空'}}
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
    <div v-if="loading" class="gulu-table-loading">
      <g-icon name="loading"/>
    </div>
  </div>
</template>

<script>
  import GIcon from './icon'
  export default {
    components: {
      GIcon,
      vnodes: {
        functional: true,
        render: (h, context) => context.props.vnodes
      }
    },
    name: "GuluTable",
    data () {
      return {
        expendedIds: [],
        columns: []
      }
    },
    props: {
      height: {
        type: Number
      },
      expendField: {
        type: String
      },
      orderBy: {
        type: Object,
        default: () => ({}),
      },
      loading: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: true
      },
      selectedItems: {
        type: Array,
        default: () => []
      },
      compact: {
        type: Boolean,
        default: false
      },
      dataSource: {
        type: Array,
        required: true,
        validator (array) {
          return !(array.filter(item => item.id === undefined).length > 0)
        }
      },
      numberVisible: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      checkable: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      this.columns = this.$slots.default.map(node => {
        let {text, field, width} = node.componentOptions.propsData
        let render = node.data.scopedSlots && node.data.scopedSlots.default
        return {text, field, width, render}
      })
      let result = this.columns[0].render({value: '方方'})
      console.log(result)

      let table2 = this.$refs.table.cloneNode(false)
      this.table2 = table2
      table2.classList.add('gulu-table-copy')
      let tHead = this.$refs.table.children[0]
      let {height} = tHead.getBoundingClientRect()
      this.$refs.tableWrapper.style.marginTop = height + 'px'
      this.$refs.tableWrapper.style.height = this.height - height + 'px'
      table2.appendChild(tHead)
      this.$refs.wrapper.appendChild(table2)


      if (this.$scopedSlots.default) {
        let div = this.$refs.actions[0]
        let {width} = div.getBoundingClientRect()
        let parent = div.parentNode
        let styles = getComputedStyle(parent)
        let paddingLeft = styles.getPropertyValue('padding-left')
        let paddingRight = styles.getPropertyValue('padding-right')
        let borderLeft = styles.getPropertyValue('border-left-width')
        let borderRight = styles.getPropertyValue('border-right-width')
        let width2 = width + parseInt(paddingRight) + parseInt(paddingRight) + parseInt(borderLeft) + parseInt(borderRight) + 'px'
        this.$refs.actionsHeader.style.width = width2
        this.$refs.actions.map(div => {
          div.parentNode.style.width = width2
        })

      }
    },
    beforeDestroy () {
      this.table2.remove()
    },

    computed: {
      expendedCellColSpan () {
        let result = 0
        if (this.checkable) { result += 1 }
        if (this.expendField) { result += 1 }
        return result
      }
    },
   
    methods: {
      inExpendedIds (id) {
        return this.expendedIds.indexOf(id) >= 0
      },
      expendItem (id) {
        if (this.inExpendedIds(id)) {
          this.expendedIds.splice(this.expendedIds.indexOf(id), 1)
        } else {
          this.expendedIds.push(id)
        }
      },
    }
  }
</script>

<style scoped lang="scss">
$border-color-hover: #666;
$border-color: #999;
$border-color-light: lighten($border-color, 30%);
$border-radius: 4px;
$box-shadow-color: rgba(0, 0, 0, 0.5);
$button-active-bg: #eee;
$button-bg: white;
$button-height: 32px;
$color: #333;
$light-color: #666;
$font-size: 14px;
$small-font-size: 12px;
$input-height: 32px;
$red: #F1453D;
$grey: #eee;
$blue: #4a90e2;
.box-shadow {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@mixin spin {
  animation: spin 2s infinite linear;
}


  $grey: darken($grey, 10%);
  .gulu-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid $grey;
    &.bordered {
      border: 1px solid $grey;
      td, th {
        border: 1px solid $grey;
      }
    }
    &.compact {
      td, th {
        padding: 4px;
      }
    }
    td, th {
      border-bottom: 1px solid $grey;
      text-align: left;
      padding: 8px;
    }
    &.striped {
      tbody {
        > tr {
          &:nth-child(odd) {
            background: white;
          }
          &:nth-child(even) {
            background: lighten($grey, 10%);
          }
        }
      }
    }
    &-sorter {
      display: inline-flex;
      flex-direction: column;
      margin: 0 4px;
      cursor: pointer;
      svg {
        width: 10px;
        height: 10px;
        fill: $grey;
        &.active {
          fill: red;
        }
        &:first-child {
          position: relative;
          bottom: -1px;
        }
        &:nth-child(2) {
          position: relative;
          top: -1px;
        }
      }
    }
    &-header {
      display: flex;
      align-items: center;
    }
    &-wrapper {
      position: relative;
      overflow: auto;
    }
    &-loading {
      background: rgba(255, 255, 255, 0.8);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 50px;
        height: 50px;
        @include spin;
      }
    }
    &-copy {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: white;
    }
    &-expendIcon {
      width: 10px;
      height: 10px;
    }
    & &-center {
      text-align: center;
    }

  }
</style>