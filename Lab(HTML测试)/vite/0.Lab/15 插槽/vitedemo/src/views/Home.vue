<template>
	<div>
		<A>
			<template #[xxx]>
				这是xxxxx数据
			</template>

			<template #default='{data}'>
				{{ data.name }} --> {{ data.age }}
			</template>

			<template #yyy>
				这是yyyyy数据
			</template>
		</A>
	</div>
</template>


<script setup>
import A from '../components/A.vue'
let xxx = ref('xxx');
</script>