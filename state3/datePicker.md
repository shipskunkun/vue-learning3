https://www.imooc.com/learn/820

DatePicker 组件开发 ——TooooBug



#### 2-1静态结构

如何写一个当前月的日历？

参考 Element datePicker , 固定位排期日历。

展示：

第一行：《 (去年)  <  (上个月)    2021年1月（当前月）      >(下个月)  》(明年)

第二行： 周日  周一     ...  周六

第三行： table <tr></tr>  ... 7行。

​									

#### 2-2样式编写

步骤：

设置 日历wrapper的宽度 和 样式

设置 heaer部分，就是  去年，上个月， 这一行，设置高度+背景色+ a标签样式

设置 日期部分元素，高度，宽度，居中对齐



#### 3章 datepicker日历数据获取

##### 3-1 前置知识

渲染当月日历表格

获取用户点击日期



获取Date 对象API。 

getFullYear

getMonth

getDate

getDay ,  周几



```js
//获取当月第一天
new Date(year , month - 1,  1) 

//当月最后一天，表示下一个的第0 天。
new Date(year , month,  0)  

星期一 ~ 星期日
[1,2,3,4,5,6,0]
```



##### 3-2 获取日历数据

参数： 年，月

返回： 展示的日历数据，返回这个月每一天的 对象 构成的数组

​	获取这个月第一天是周几？如果是周一，不加上个月数据，否则，加上上个月数据

​	

添加上个月数据的天数？如果 getDay == 0 ，表示当月第一天是周日，则添加上个月的日期天数是 0个， 如果getDay == 1, 添加1个上个月数据，所以上个月添加天数 n = getDay

比如 n = 3, 表示本月第一天是周三，要添加3个上个月日子

new Date(year, month -1, 0)  // 上个月最后一天

上个月最后一天前一天

上个月最后一天前2天

```js
let preMonthDayCount = new Date(year, month - 1, 1).getDay();  //本月第一天，周几
let lastDayOfLastMonth = new Date(year, month - 1, 0).getDate() // 上个月的最后一天

// 添加的上个月的日子数据。
let arr = [];
for(let i = preMonthDayCount ; i>0; i--) {
  arr.push(lastDayOfLastMonth - i + 1)
}

上个月最后一天，31号
当 i= 3, 29
i= 2, 30
i = 1, 31
```



当月的最后一天，是不是周六？ getDay == 6？ 是，不用添加下一个

如果当前月最后一天是周日，补充6个。

所以下个月补充，几个日子数据？ getDay - 6个。

```js
统一处理
let preMonthDayCount = new Date(year, month - 1, 1).getDay();  //本月第一天，周几
let lastDayOfLastMonth = new Date(year, month - 1, 0).getDate() // 上个月的最后一天

var lastDay = new Date(year, month , 0)  //本月最后一天周几
var lastDate = lastDay.getDate(); //本月有几天。

for(let i = 0; i < 7*6; i++) {
	var date = i + 1 - preMonthDayCount
  var showDate = date;
  var thisMonth = month;
  
  if(date <=0 ){
    thisMonth = month - 1;
    showDate = lastDateOfLastMonth() + date   // 比如上个月最后一天 31 + -2 = 29
  }else if (date > lastDate) {
    thisMonth = month + 1;   
    showDate = showDate - lastDate;
  }
  if(thisMonth ===0) thisMonth = 12
  if(thisMonth ===13) thisMonth = 1
  
  ret.psuh({
    month: month,
    date: date,
    showDate: showDate
  })
}
```



#### 4章 数据渲染

根据返回的数组渲染  monthDate, 是长度42的一维数组，i%7 ==0 ，换行

获取当前年月

展示，视频中是  input   focus 的时候，去掉 table



#### 5章 事件绑定

##### 5-1 如何在 input  focus 的时候，隐藏日历组件？

监听 focus，table  去掉一个class，   这个class，display: block 

else， 添加class，display: block



##### 5-2月份切换

通过事件代理，在 wrapper 上处理 a标签的点击事件

##### 5-3 日子点击

通过事件代理，在 wrapper 上处理  日历单元格 的点击事件

把值放到单元格中

如何获取当前点击日期？假如点到了上个月怎么办？

方法一，上个月不准点。

方法二，点击能获取渲染点的 obj 对象，里面有 month, 如果不等于当前月，返回。

#### 6章 课程总结



