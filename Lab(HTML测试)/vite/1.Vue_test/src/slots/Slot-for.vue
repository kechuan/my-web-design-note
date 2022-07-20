<template>
	<br>

		<div id="Slot_Data">
			<div v-for='item in list' :key='item.id'>
				<slot :data='item'></slot>
			</div>
		</div>

</template>

<script setup lang="ts">
let list = ref([
	{id:1,name:'Tf',age:16},
	{id:2,name:'kac',age:18},
	{id:3,name:'kec',age:19},
	{id:4,name:'ww',age:24},
])
</script>

<style lang="css">
</style>