<template>
  <div class="cascaderItem" :style="{height: height}">
    <div class="left">
      <div class="label" v-for="item in items" @click="onClickLabel(item)"  :key="item.name">
        <span class="name">{{item.name}}</span>
        <span class="icons">
          <template v-if="item.name === loadingItem.name">
            <icon class="loading" name="loading"></icon>
          </template>
          <template v-else>
            <icon class="next" v-if="rightArrowVisible(item)" name="right"></icon>
          </template>
        </span>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <gulu-cascader-items ref="right" :items="rightItems" :height="height"
        :loading-item="loadingItem"
        :load-data="loadData"
        :level="level+1" :selected="selected" @update:selected="onUpdateSelected"></gulu-cascader-items>
    </div>
  </div>
</template>

<script>
  import Icon from '../icon'
  export default {
    name: "GuluCascaderItems",
    components: {Icon},
    props: {
      items: {
        type: Array
      },
      height: {
        type: String
      },
      loadingItem: {
        type: Object,
        default: () => ({})
      },
      selected: {
        type: Array,
        default: () => []
      },
      loadData: {
        type: Function
      },
      level: {
        type: Number,
        default: 0
      }
    },
    computed: {
      rightItems () {
        if (this.selected[this.level]) {
          let selected = this.items.filter((item) => item.name === this.selected[this.level].name)
          if (selected && selected[0].children && selected[0].children.length > 0) {
            return selected[0].children
          }
        }
        return null;
      },
    },
    mounted () {
    },
    methods: {
      rightArrowVisible (item) {
        return this.loadData ? !item.isLeaf : item.children
      },
      onClickLabel (item) {
        let copy = JSON.parse(JSON.stringify(this.selected))
        console.log('this.selected', JSON.stringify(this.selected));
        copy[this.level] = item
        copy.splice(this.level + 1) // 一句话
        this.$emit('update:selected', copy)
      },
      onUpdateSelected (newSelected) {
        this.$emit('update:selected', newSelected)
      }
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
  .cascaderItem {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100px;
    .left {
      height: 100%;
      padding: .3em 0;
      overflow: auto;
    }
    .right {
      height: 100%;
      border-left: 1px solid $border-color-light;
    }
    .label {
      padding: .5em 1em;
      display: flex;
      align-items: center;
      cursor: pointer;
      white-space: nowrap;
      &:hover {
        background: $grey;
      }
      > .name {
        margin-right: 1em;
        user-select: none;
      }
      .icons {
        margin-left: auto;
        .next {
          transform: scale(0.5);
        }
        .loading {
          animation: spin 2s infinite linear;
        }
      }
    }
  }
</style>