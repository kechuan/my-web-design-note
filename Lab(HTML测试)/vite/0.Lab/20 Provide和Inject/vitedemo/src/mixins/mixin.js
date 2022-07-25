export const fav = {
	data () {
		return {
			num:10
		}
	},
	methods:{
		favBtn( params ){
			this.num += params;
		}
	}
}