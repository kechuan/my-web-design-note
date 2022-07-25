<template>
	<div>
		<h1>A组件</h1>
		{{ aNum }}
		<hr />
		<B></B>
	</div>
</template>

<script setup>
import B from './B1.vue'
const aNum = inject('changeNum');
</script>