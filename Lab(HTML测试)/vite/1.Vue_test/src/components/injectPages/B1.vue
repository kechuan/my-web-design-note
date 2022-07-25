<template>
	<div>
		<h3>B组件</h3>
		{{ bNum }}
		<button @click='btn'>按钮+10</button>
	</div>
</template>

<script setup>
const bNum = inject('changeNum');
const btn = ()=>{
	bNum.value += 10;
}
</script>