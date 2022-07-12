<template>
  <div class="text">AP0 vite组件更新响应处理</div>

<!--   <div @click="parent">me
    <div @click.stop="child">child</div>
  </div>

  <div :class="c0">{{test}}</div>

  <div :style="flag">???</div>
 -->
<input v-model="message" type="text" placeholder="v-model" />
  <div>Date.now():{{ message }}</div>

  无论保存刷新多少次 该组件在代码解析上依旧是date.now 所以永远都不会再次更新
  即使你改变了模板的组件#id,.class 其内部的script也不会再次去解析

	<div></div>

</template>


<script setup lang="ts">
// import { ref } from 'vue' //ref auto自动引入

//     const child = () => {
//   console.log('child');
 
// }
// const parent = () => {
//   console.log('parent');
// }

// type st = {
//   c1: boolean,
//   c2: string
// }

// const c0: st = {
//   c1: false,    //取消c1的class属性
//   c2: "???"
// }

// const test: string = c0

// type Cls = {      //聚合定义类型
//   height: string,
//   width: string,
//   color: string
// }
// const flag: style = {   //引入定义释放
//   height: "300px",    //取消class下的other属性
//   width: "300px",
//   backgroundColor: "red"
// };


 //极其不建议将需要动态代码塞进vue里面

const message = Date.now() //将v-model与message通过ref链接 
//也可以先给其value赋值 ref([val])




</script>

<style>
	#AP0{
    gap: 5px;
    display: flex;
    flex-direction: column;
  }
</style>