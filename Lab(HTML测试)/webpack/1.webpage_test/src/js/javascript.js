import $ from 'jquery'
import '@/css/style.css'
import '@/iconfont/fonts/back_icon/back_icon.js'
import '@/iconfont/fonts/arrow/arrow.js'
import '@/iconfont/icons.css'
import {carousel} from '@/js/carousel.js'	//而js本体又是ES引入(编译引入) 减少http请求


//在JS修改CSS属性的时候，必须要去掉原本横线，改驼峰命名
	$(function Notepad(){
		$("#openNotepad").on("click",function(){
			$('#sidebar').css("right","0")
			$('#openNotepad').css("display","none")
			$('#closeNotepad').css("display","block")
			$('#sidebar_swt').css("right","132px")
			$('#sidebar_swt').css("top","420px")
			$('#framework').css("z-index","3")	
		})
	
		$("#closeNotepad").on("click",function(){
			$('#sidebar').css("right","-300px")
			$('#openNotepad').css("display","block")
			$('#closeNotepad').css("display","none")
			$('#sidebar_swt').css("right","-168px")
			$('#sidebar_swt').css("top","0px")
			$('#framework').css("z-index","0")	
		})


		$(".nav_item.db").hover(
			() => $("#Time").css("color","white"),			//悬停显示
			() => $("#Time").css("color","rgb(0,0,0,0)")	//离开隐形
		)

	})	

	$(function arrow(){
		$("#arrow_prev").on("click",function(){
			$("#picture_show img")[0].setAttribute("src",carousel().prev())
			
		});

		$("#arrow_next").on("click",function(){
			$("#picture_show img")[0].setAttribute("src",carousel().next())
			
		});	
	})


const clock = setInterval(function()
{
	/*创建Date的新对象*/
	var myDate = new Date();
	var Day = myDate.getDay();
	var Hour = myDate.getHours().toString().padStart(2,"0");	/*ES6特性 toString与padStart*/
	var Minute = myDate.getMinutes().toString().padStart(2,"0");
	var Second = myDate.getSeconds().toString().padStart(2,"0");
	// $("#Time")[0].innerHTML = `${Hour}:${Minute}:${Second}`;
	$("#Time").text(`${Hour}:${Minute}:${Second}`)

},1000);