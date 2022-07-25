const Json2css = function(){
	return{
		change:function(style){
    		var string = [];
		    	for(let array in style){
		            string.push(`${array}:${style[array]}`);
			      }
	      	string = string.join(';');
	        
		    return string
		}
	}
}
		
export {json2css}
