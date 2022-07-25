<template>
	<div>
		父类的组件信息 => 而这是子类自定义引入的信息:{{msg}}
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