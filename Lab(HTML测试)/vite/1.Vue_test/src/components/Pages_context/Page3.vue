<template>
	<div class="text" style="color:#986;">Page3:组件与插件</div>
prop:
	<div>
		引入prop属性代替实际的文本内容
		<Father :msg='msg'></Father>	
	</div>

<gapc></gapc>

is:
	
		引入is选择渲染组件 - 动态组件
		<!-- v-for='(x,index) in comp' -->
	<div v-for='x in comp' @click='changecomp(x)' :key='x.id'>
		{{x.name}} -> 
	</div>	
	<keep-alive>
		<component :is="refcomp.com"></component>
	</keep-alive>
<br>
说来也奇怪 这种方式目前只看到能用于引入的组件
而却不能用于本地组件内

还是说 is的判断只能是__file文件名?
<br>


<div class="sgap"></div>
async:beforeTrans

<Suspense>
	<template #default>
		<dynamicImg></dynamicImg>
	</template>

	<template #fallback>
		<div class="gap">C is not displaying</div>
		 
	</template>
</Suspense>


<div class="mgap"></div>
async:dynamic import/lazy import


<Suspense>
	<template #default>
		<div ref='target'>
	<dynamicA v-if='targetIsVisible'></dynamicA>
		</div>
	</template>

	<template #fallback>
		<div class="gap">A is not displaying</div>
		 
	</template>
</Suspense>





<div class="sgap"></div>

Part:插槽 - slot
	<SL>
		<template #Par2>
			2.这是数据 在被引入的页面直接书写的内容会在子页面以slot标签形式存储
		</template>

		<template #Par5>
			5.而带有名字的属性的slot 
		需要主组件上启用v-slot:来对应
		</template>
		
	</SL>


<pre>
而对于list的列表 在子组件传出data属性后(data值为每个list的元素)
在对应引入组件的template标签下引入 但是标签要设置为#defalut='{[name]}'
这样才可以在标签语法内随意使用

</pre>

	<SLfor>
		<template v-slot='{data}'>
		<!-- <template slot-scope="data"> -->
			{{ data.name }} --> {{ data.age>=24?Old:Young }}
		</template>

		
	</SLfor>

</template>

<script setup lang='ts'>
	import { ref, defineAsyncComponent, reactive, markRaw } from 'vue' //ref auto自动引入
	import {useIntersectionObserver} from '@vueuse/core'
	//引入组件
	import gapc from '#/css/gap.vue'
	import Father from '#/Father.vue'
	import SL from '@/slots/Slot-name.vue'
	import SLfor from '@/slots/Slot-for.vue'

	
	const dynamicA = defineAsyncComponent(() => 
		import('../dynamic/A.vue') 
	)

	const dynamicB = defineAsyncComponent(() => 
		import('../dynamic/B.vue') 
	)

	const dynamicImg = defineAsyncComponent(() => 
		import('../dynamic/tinyImgCom.vue') 
	)

	let msg = ref(' 这事主组件传的')

	let Young = ref('是学生')
	let Old = ref('是主播')

	const comp = reactive([
		{id:1,name:'a',ex:markRaw(dynamicA)},
		{id:2,name:'b',ex:markRaw(dynamicImg)}

	])

	let refcomp = reactive({
		// com:comp[0].ex	
		com:''

		//响应式的端口选择 
		//可以选择默认的索引 但因为涉及到对象内的属性 所以必须要用reactive而不是ref

	})

	let changecomp = (cur:any)=>{
		refcomp.com = cur.ex
		console.log(refcomp.com)
	}

	const target = ref(null); //进行动态关联
	const targetIsVisible = ref(false) 
	//默认状态 不可见

	const judge = useIntersectionObserver(target,
		([{isIntersecting}]) =>{
			if(isIntersecting){
			targetIsVisible.value = isIntersecting
			}
		},
	)
	

</script>

<style lang="css">
	.mgap{
		height: 300px;
	}

	.bgap{
		height: 500px;
	}

	.sgap{
		height: 120px;
	}
</style>