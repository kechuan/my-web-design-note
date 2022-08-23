var list = document.getElementById('view')

function change(){
	var css = list.href.split('/')

	if(css.pop()=='listview.css'){
		console.log('to grid');
		css.push('gridview.css')
		list.href=css.join('/')
	}
	

	else{
		console.log('to list')
		css.push('listview.css')
		list.href=css.join('/')
	}
}
