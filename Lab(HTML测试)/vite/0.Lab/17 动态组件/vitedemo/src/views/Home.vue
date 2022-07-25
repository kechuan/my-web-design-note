<template>

	<ul>
		<!-- v-for='(item,index) in tabList' -->
		<li
			v-for='(item,index) in tabList'
			:key='index'
			@click='change(index)'
		>
			{{ item.name }}
		</li>
	</ul>

	<keep-alive>
		<component :is="currentComponent.com"></component>
	</keep-alive>

</template>

<script setup>
import A from '../components/A.vue'
import B from '../components/B.vue'
import C from '../components/C.vue'

let tabList = reactive([
	{name:'A准备好面试题',com:markRaw(A)},
	{name:'B准备简历',com:markRaw(B)},
	{name:'C准备好项目',com:markRaw(C)}
]);

let currentComponent = reactive({
	com:tabList[0].com
});

const change = ( idx )=>{
	currentComponent.com = tabList[idx].com;
}

</script>