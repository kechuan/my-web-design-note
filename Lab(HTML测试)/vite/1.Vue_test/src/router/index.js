import { createWebHistory, createRouter } from 'vue-router'

const routes = [
	{
		path:'/Page0',
		name:'Page0',
		component: import("../components/Pages_context/Page0.vue")
	},

	{
		path:'/Page1',
		name:'Page1',
		component: import("../components/Pages_context/Page1.vue")
	},

	{
		path:'/Page2',
		name:'Page2',
		component: import("../components/Pages_context/Page2.vue")
	},

	{
		path:'/Page3',
		name:'Page3',
		component: import("../components/Pages_context/Page3.vue")
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
