import { createWebHistory, createRouter } from 'vue-router'

const routes = [
	{
		path:'/Page0',
		name:'Page0',
		component: import("../components/Page0.vue")
	},

	{
		path:'/Page1',
		name:'Page1',
		component: import("../components/Page1.vue")
	}

	,

	{
		path:'/Page2',
		name:'Page2',
		component: import("../components/Page2.vue")
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
