import { createStore } from 'vuex'

export default createStore({
	state: {
		num:10,
		sum:10,
		str:'Data(str)'
	},
	getters:{
		total(state){
			return state.num + state.sum;
		}
	},
	mutations:{},
	actions:{},
	modules:{},
})