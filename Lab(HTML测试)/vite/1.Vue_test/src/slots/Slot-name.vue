<template>
	<br>
	<div id="Slot_text">
			{{Slot}} 
		<br><slot name='Par2'></slot>
		<br>3.在总体上刚好就等于是 内部的script赋值+外部的slot插槽插值
		<br>{{Slot2}}
		<br><slot name='Par5'></slot>
	</div>

</template>

<script setup lang="ts">
let Slot = '1.load ok'
let Slot2 = '4.而在外部html来看却完全看不出来内部的数据如何构成'
</script>

<style lang="css">
</style>