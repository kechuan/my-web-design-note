<template>
	<div id="nav">
	<button @click='prev_page'>上一页</button>
	<div id="lang"> 总路由节点 page:{{Pages}} </div>
	<button @click='next_page'>下一页</button>
	
	</div>
	<div id="slogan" style="color: #f4a;">Vue Lab, learn for myself</div>

	<br>
	<router-view></router-view>
</template>

<script setup lang='ts'>
	var flag: number = 0;
	let Pages = ref(flag)

	let uses = new useRouter;

	let prev_page = ()=>{
		Pages.value = --flag
		uses.push(`/Page${flag}`)
		document.getElementById('slogan').setAttribute('style','color:#000')
		
	}

	let next_page = ()=>{
		Pages.value = ++flag
		uses.push(`/Page${flag}`)
		document.getElementById('slogan').setAttribute('style','color:#000')
	}

	
</script>

<style lang="css">
	#nav{
		display: flex;
	}

	#slogan{
		transition:all 3s linear;
	}

</style>