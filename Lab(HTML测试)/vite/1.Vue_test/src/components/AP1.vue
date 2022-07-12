<template>
	<div id="A" style="color:gray">AP1:ref series</div>
	
	<div id="ref">ref有什么用? {{change}}
<pre>当使用setup语法糖时就允许你直接默认导出接return
那ref所谓的获取DOM又能作用在哪里呢？
		</pre>
	</div>

那还真的有用

<div class="gap"></div>
	<div id="msg1">{{msg1}}:[非ref]{{num1}}</div>
	<div id="msg2">这是一个响应数据:{{num2}}</div>
	
<pre>
	按下按钮后 只有ref响应的数据会变动
	所以作用就是在这里 当触发了事件让数据需要变动!的时候 
	就需要用的上ref(reactive)来获取DOM不断更新数值
	那为什么以前的写法就不需要这些？

	A:以前的写法其实也是同样的道理 
	data(){return x:0}
	只是一直在setup语法糖里一次性植入所有DOM数据让你以为
	不再需要DOM了 实际上是setup早就获取了DOM并去更新数据了
</pre>

	<div id="test">这事一个ref计时器:{{test}}</div>
	<button @click="Start">Start</button><br>
	<button @click='Pause'>Pause</button>
	<button @click='Continue'>Continue</button>
	<button @click='Tick'>Tick</button>

	<div id="tick">记录:{{tick}}</div>

	<pre>按下Pause后 因为用了toRefs 所以数据不再进行关联 但是后台还是的实际值value(Tick按钮)还是允许变动</pre>

</template>


<script setup lang="ts">
	let msg1 = ref('这是一个普通数据')
	let num1 = Date.now() 
	let num2 = ref(Date.now())
	const Start = () =>{
		Timer()
		num2.value = Date.now()
		

		try{
			this.num1 = Date.now()
		}

		catch{
			msg1.value = 'change failed'
		}

	}

	var a = 0;
	console.log(ref(a))
	var tick = ref(0);
	var test = ref(0); //所以说极其不建议将变动数值直接绑定上面 应该将动态数值给其他然后定时更新
	const Timer = ()=>{setInterval(()=>{a++;test.value = a},1000)}
	

	const Pause = ()=>{
		test = toRefs(test)
	}

	const Continue = ()=>{
		test.value = toRef(a)	//继续关联
	}

	const Tick = ()=>{
		tick.value = test
	}
</script>

<style>
	.gap{
		width: 100%;
		height: 2em;
	}
</style>