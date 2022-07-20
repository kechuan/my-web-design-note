<template>
	<div>
		<h1>子：A组件</h1>

		<header>
			<div>头部</div>
			<slot name='xxx'></slot>
			<slot name='yyy'></slot>
		</header>

		<section>
			<div>中间</div>
			<div v-for='item in list' :key='item.id'>
				<slot :data='item'></slot>
			</div>
		</section>

		<footer>
			<div>底部</div>
			<slot name='xxx'></slot>
		</footer>

	</div>
</template>

<script setup>
let list = ref([
	{id:1,name:'张三',age:18},
	{id:2,name:'张大三',age:22},
	{id:3,name:'张小三',age:33},
	{id:4,name:'里斯',age:55},
]);
</script>