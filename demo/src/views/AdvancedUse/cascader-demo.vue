<template>
  <div>
    <p></p>
    <div style="padding: 20px;">
      <g-cascader :source="source" popover-height="200px"
      :selected="selected" @update:selected="selected = $event">
    </g-cascader>
    </div>
  </div>
</template>
<script>
  //45min38s
  import Button from '../../components/button/button'
  import Cascader from '../../components/cascader/cascader'


  export default {
    name: "demo",
    components: {
       'g-button': Button,
       'g-cascader': Cascader
    },
    data () {
      return {
        selected: [],
        source: [{
          name: '浙江',
          children: [{
            name: '杭州',
            children: [
            {name: '上城'},
            {name: '下城'},
            {name: '江干'},
            ]
          },
          {
            name: '嘉兴',
            children: [
            {name: '南湖'},
            {name: '秀洲'},
            {name: '嘉善'},
            ]
          }]
        },{
          name: '安徽',
          children: [{
            name: '合肥',
            children: [
            {name: '庐江'},
            {name: '肥东'},
            {name: '肥西'},
            ]
          },
          {
            name: '芜湖',
            children: [
            {name: '弋江区'},
            {name: '鸠江区'},
            {name: '三山区'},
            ]
          }]
        }] 
      }
    },
    methods: {
    }
  };
</script>
<style>
  /*@import 'var';*/
  * {margin: 0; padding: 0; box-sizing: border-box;}
  body {background: white;}
</style>
<style scoped lang="scss">
</style>
