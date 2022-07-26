<template>
	<div>
		<h3>B组件</h3>
		{{ bNum }}
		<button @click='btn'>按钮+10</button>
	</div>
</template>

<script setup lang="ts">
import {inject} from 'vue'
const bNum:any = inject('changeNum');
const btn = ()=>{
	bNum.value += 10;
}
</script>