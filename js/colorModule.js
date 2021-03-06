const color_Json = function(color){
	switch(color){
		case "yellow": return color_Json().yellow(); break;	//二层嵌套转一层字符串
		case "red": return color_Json().red(); break;
	}

	return{
		red:function(){
	        return this.change({
	        	"background-color":"red",
	        	"text-decoration":"none"
	        })
    	},

    	yellow:function(){
	        return this.change({
	        	"background-color":"yellow",
	        	"text-decoration":"none"
	        })
    	},

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

export {color_Json}
