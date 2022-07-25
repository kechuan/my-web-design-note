<template>
	<div>
		<h1>B组件</h1>
		{{ bNum }}
		<button @click='btn'>按钮</button>
	</div>
</template>

<script setup>
const bNum = inject('changeNum');
const btn = ()=>{
	bNum.value = 200;
}
</script>