<template>
	<div @keyup.left='prev_page' @keyup.right='next_page' id='nav'>
		<button @click='prev_page'>上一页</button>
		<div id="lang"> 总路由节点 page:{{Pages}} </div>
		<button @click='next_page'>下一页</button>
		<input type="text" v-model='page_sync' @keyup.enter="jump_page" placeholder="jump here..">
	</div>
	<div id="slogan" style="color: #f4a;">Vue Lab, learn for myself</div>

	<br>

	<router-view v-slot="{ Component }">
		<keep-alive>
			<component :is='Component'></component>
		</keep-alive>
	</router-view>

</template>

<script setup lang='ts'>
	import { useRouter } from 'vue-router'
	import {ref} from 'vue'

	var flag: any = 0;
	let Pages = ref(flag)
	let page_sync = ref('') //v-model值 可响应许可

	let uses = new (useRouter as any);

	let prev_page = ()=>{
		Pages.value = --flag
		uses.push(`/Page${flag}`)
	}

	let next_page = ()=>{
		Pages.value = ++flag
		uses.push(`/Page${flag}`)
	}

	let jump_page = ()=>{
		console.log(page_sync.value)
		flag = page_sync.value;
		Pages.value = flag;
		uses.push(`/Page${flag}`)
	}
	

</script>

<style lang="css">
	#nav{
		display: flex;
		gap: 3px;
	}

	#slogan{
		transition:all 3s linear;
	}

</style>