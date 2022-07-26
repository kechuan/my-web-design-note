<template>
	<div class="text" style="color:#846;">Page2:watch&computed</div>
	<!-- <router-link to='/Page2'>Page2:watch&computed</router-link> -->

	computed计算属性
	<pre>怎么计算 计算能干什么?
computed与ref一样 一旦代理就会包裹进对象(ComputedRefImpl)里
一种用法是当正常的赋值使用

而另一种用法是搭配上get,set等proxy语句使用 
但是不管什么方式computed无法再去页面变动 即使是内置的get,set都无法进行页面变动
可能是跟以前一样 需要一个代理数值来存放ref

所以我还是不清楚 computed的具体用法

</pre>
	<div class="gap"></div>
	<div id="show2" @click='altar'>
		{{msg2}} ==>?x {{msg2Change}}
	</div>
	
<pre>听说下文的watch可以搭配computed</pre>	

	<div class="gap"></div>
	<div class="text">Watch 初始化监听</div>

	<input type="text" v-model='model2'>

	<br><div class="text">Watch 多目标监听</div>
	<input type="text" v-model='watch1'>
	<input type="text" v-model='watch2'>

	<br><div class="text">Watch 深层对象监听</div>
	<input type="text" v-model='watch3.arr'>
	
</template>

<script setup lang='ts'>
import { ref, watch, computed, reactive } from 'vue' //ref auto自动引入
let msg2:string = 'why so serious?'

let altar = ()=>{
	console.log(msg2Change) //触发get
}

let msg2Change:any = computed({
	get(){
		 msg2Change.value = 'it changed' //触发set 但是却不会改变页面内容
	},
	set(val){
		console.log('changed')
		// msg2.value = 'so it changed again'
	}
})

// let msg2Change = computed(()=>{return msg2Change.value = '3'})
	

let model2 = ref<string>('Data1')
let watch1 = ref('')
let watch2 = ref('')

let watch3 = reactive({
	a:1,
	arr:['a','b','c']
}) 


watch(model2, (newVal,oldVal)=>{
	console.log(oldVal+'=>'+newVal)
})

watch([watch1,watch2],(newVal,oldVal)=>{console.log(newVal,oldVal)})

watch([()=>watch3.arr],(newVal,oldVal)=>{console.log(oldVal+'=>'+newVal)})
</script>

<style lang="css">
</style>

