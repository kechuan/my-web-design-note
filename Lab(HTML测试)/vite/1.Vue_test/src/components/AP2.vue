<template>
	<div class="gap"></div>
<div id="B" style="color:green;">AP2:ref</div>

<div id="data2">{{name}} {{age}}</div>

<div class="item">
    <input type="text" v-model="toRefVal" @input="inputToRefHander">
    {{ toRefVal }}
</div>

</template>

<script setup lang='ts'>
let obj = reactive({
	name:'Sanbei',
	age:24
})	//无法解构
let {name, age} = toRefs(obj) //搭配toRefs 可以解构

const obj2 = { type: 'obj', target: '5' }
const toRefVal = toRef(obj2, 'target'); //将obj2对象里的target属性与v-model关联
const inputToRefHander = () => {
  	console.log("原始数据:::", obj2);
}

</script>

<style lang="css">
</style>

