<template>
  <div>
    <div style="margin: 20px">
      <g-table :columns="columns" :data-source="dataSource"></g-table>
    </div>
    <div style="margin: 20px">
      <g-pager :total-page="10" :current-page.sync="currentPage"></g-pager>
    </div>
  </div>
</template>
<script>
  //45min38s
  import Pager from '../../components/pager'
  import Table from '../../components/table'


  export default {
    name: "demo",
    components: {
       'g-pager': Pager,
       'g-table': Table
    },
    data () {
      return {
        currentPage: 1,
        columns: [
        {text: '姓名', field: 'name'},
        {text: '分数', field: 'score'},
        ],
        dataSource:[ 
          {id: 1, name: '方方', score: 100},
          {id: 2, name: '圆圆', score: 88},
          {id: 3, name: '张三', score: 99},
          {id: 4, name: '李四', score: 80},
          {id: 5, name: '超人', score: 90},
        ]
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
