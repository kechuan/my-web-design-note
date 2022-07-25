<template>
	
	<A></A>
	
</template>

<script setup>
import A from '../components/A1.vue'
let num = ref(100);
provide('changeNum', num );
</script>