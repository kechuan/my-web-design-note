import { createWebHistory, createRouter } from 'vue-router'

const routes = [
	{
		path:'/Page0',
		name:'Page0',
		component: ()=> import("../components/Pages_context/Page0.vue"),
		meta:{keepAlive:false}
	},

	{
		path:'/Page1',
		name:'Page1',
		component: ()=> import("../components/Pages_context/Page1.vue"),
		meta:{keepAlive:false}
	},

	{
		path:'/Page2',
		name:'Page2',
		component: ()=> import("../components/Pages_context/Page2.vue"),
		meta:{keepAlive:false}
	},

	{
		path:'/Page3',
		name:'Page3',
		component: ()=> import("../components/Pages_context/Page3.vue"),
		meta:{keepAlive:false}
	},

	{
		path:'/Page4',
		name:'Page4',
		component: ()=> import("../components/Pages_context/Page4.vue"),
		meta:{keepAlive:false}
	},

	{
		path:'/Page5',
		name:'Page5',
		component: ()=> import("../components/Pages_context/Page5.vue"),
		meta:{keepAlive:false}
	},

	{
		path:'/PageX',
		name:'PageX',
		component: ()=> import("../components/Pages_context/PageX.vue"),
		meta:{keepAlive:false}
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
