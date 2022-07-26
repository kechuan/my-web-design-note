<template>
	<div>
		<h3>A组件</h3>
		{{ aNum }}
		<button @click='btn'>按钮+1</button>
		<B></B>
		<hr />
		
	</div>
</template>

<script setup lang="ts">
import {inject} from 'vue'
import B from './B1.vue'
const aNum:any = inject('changeNum');
const btn = ()=>{
	aNum.value += 1;
}
</script>