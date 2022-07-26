<template>
	
	<div class="text" style="color:#1a5640;">Page4:Teleport</div>
	<div class="gap"></div>
	<div id="tea">在默认tp到body下时不会比tp更后</div>

	<teleport to='#tea'>
		<div>TP内容:load ok 只会追加至最末尾</div>
	</teleport>

	<br>那么如果是视图相关呢？<br><br>
	

	<div class="relative_view">
		这事相对内容 TP内容无法直接写入被html占用的div上 除非换成声明渲染
	<br>但毕竟还是相对显示 是脱离文档流的 其之内的原本内容将会被覆盖掉
		<div class="absolute_view">{{view}}</div>
	</div>

	<teleport to='.absolute_view'>
		<div>比如 此段的框框后的TP进绝对内容:load 是在声明渲染之后</div>
		其遵守父类的relative 但也遇到了它的问题
		<br>
	</teleport>

	那怎么办？
<gapc></gapc>
插曲:对于脱离文档流的处理 
<br>简单的一个办法是强靠css撑起来 使其实际文档流对得上相对显示的文档流
<br>不过这很奇怪的是一般的css是无法干涉这种的视窗显示
	<div id="blank">

		
	&lt;gapc&gt;&lt;/gapc&gt;
	  而通过vue组件引入的标签以及html自带br标签等却可以正常的影响

<gapc></gapc>
#TP:v-if与TP显示
<br>

  		<button @click="open=true">Open Modal</button>
		<Teleport to="body">
		  <div v-if="open" class="modal">
		    <p>Hello from the modal!</p>
		    <button @click="open=false">Close</button>
		  </div>
		</Teleport>

	</div>

</template>

<script setup lang="ts">
	import { ref } from 'vue' //ref auto自动引入
	import gapc from '#/css/gap.vue'
	let view = ref('这事相对内容下的绝对内容 但是是渲染进去的')
	let open = ref(false)
</script>


<style lang="css">
	.relative_view{
		position: relative;
	}

	.absolute_view{
		position: absolute;
	}

.modal {
  border: 1px blue solid;
  position: fixed;
  z-index: 999;
  top: 20%;
  right: 10%;
  width: 300px;
  margin-left: -150px;
}

#blank{
	position: relative;
}
</style>