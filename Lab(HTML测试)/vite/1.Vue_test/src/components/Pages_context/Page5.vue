<template>
<div class="text" style="color:#0a4a56">Page5:Provide/Inject</div>

<br>
load ok
<br>


Inject it:
<keep-alive>
	<A></A>
</keep-alive>

<br>


</template>

<script setup lang="ts">
// import { ref,provide } from 'vue' //ref auto自动引入
import A from '../injectPages/A1.vue'

let num = ref(0)
provide('changeNum', num );

</script>

<style lang="css">
</style>