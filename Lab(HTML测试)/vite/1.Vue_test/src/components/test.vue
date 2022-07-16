<template>
<div>
	组件信息 => {{msg}}
</div>
	
</template>

<script setup lang='ts'>
defineProps({
	msg:{
		type:String,
		default:''
	}
})

</script>

<style lang="css">
</style>