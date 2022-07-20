<template>


	<div class="text" style="color:#986;">Page3:组件与插件</div>
	
	<div>
		引入prop属性代替实际的文本内容
		<Father :msg='msg'></Father>	
	</div>


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
	
	import Father from '../Father.vue'
	import SL from '../../slots/Slot-name.vue'
	import SLfor from '../../slots/Slot-for.vue'
	let msg = ref('?')

	let Young = ref('是学生')
	let Old = ref('是主播')



</script>

<style lang="css">
</style>