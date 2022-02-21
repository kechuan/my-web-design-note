//记住 在JS修改CSS属性的时候，必须要去掉原本横线，改驼峰命名
	$(function(){
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
			() => $("#Time").css("color","white"),			//悬停中
			() => $("#Time").css("color","rgb(0,0,0,0)")	//悬停离开
		)

	})
	
function editNotepad(){
}

/*定义clock,创立一个计划任务(function里的{显示时间}),每1s执行
重新定义Date的父子属性,便于语义化
补0操作，实际上你需要先转化成str,你才能对文字操作,
转化为str后，使从右往左的第X字符如为空字符，则补写0上去

遗憾的是，因为js代码执行本来就有延迟
运用这种操作将不可避免的在长期运行网站(特别是后台)时时间发生偏差
后期的校准操作估计要写一套配合这个的校准方案，但真有必要的话，还是建议重写

//为什么不用setTimeout('displaytime()',1000)?
这玩意一旦调用的东西多起来,就会出现计时偏差.执行的东西太多了(
想想网上写的吃小苹果比赛，30s硬是卡成3min时长
setInterval是计划任务般的存在,受到卡顿的影响比这玩意小，当然也不是没有负面
*/
const clock = setInterval(function()
{
	/*创建Date的新对象*/
	var myDate = new Date();
	var Day = myDate.getDay();
	var Hour = myDate.getHours().toString().padStart(2,"0");	/*ES6特性 toString与padStart*/
	var Minute = myDate.getMinutes().toString().padStart(2,"0");
	var Second = myDate.getSeconds().toString().padStart(2,"0");
	document.getElementById("Time").innerHTML = `${Hour}:${Minute}:${Second}`;
},1000);



	

/*你要补0，你就必须要转换为str，才能够补0
padstart是指从右边为起始的第几位增加你要的数值*/

/*这个过程看着像不像C((

主动转换
.toString(var) 为str,一般来说，对数值作出编辑必须要先转换成str

var = parseInt(var)从左到右获取Int,
类比C里面的(Int)(var)

parseFloat(var)...

如果它第一个就读取到非整数值则结果会直接为Nan，如果第一个有第二个否就只会读取第一个



log
有没有发现，prompt的执行顺序居然会比document.write优先级更高，
但是输出次序依然按照代码顺序来
疑似直接调用prompt的时候会直接将整个页面暂停(待验证


IIFE() 类似于提前订好的规则


DOM操作

基础 读取引用/修改
0.省略
var a = document.getElementByID("name");
a.remove/has/ blabla 能够省略很多
本文省略
doc与elem


Read
var body = doc.body(返回当前页面的body元素) blabla
body.createAttribute


a-1创建
var a = doc.createElem('div'); //创建元素节点

	a-2追加属性
	a.href="127.0.0.1";
	a.target="_blank";
	a.style.textDecorate="none";

	a*创建子元素
	var div = doc.createElem('div'); 
	var txt = document.createTextNode("???");


直接添加节点(子节点) 建立父子关系

在此之前，先将父子节点挂载在指定的位置上，比如这里是body

doc.body.appendChild(div)； //这是一件行为，所以不需要额外定义变量，在body上创建一个节点div
							  	 
div.appendChild(txt);	//节点里添加子元素txt
	T 创建文本节点
	var txt = doc.createTextNode("???") //创建文本节点
= <div>???</div>


c-1

注，在这里是不用加引号的，大概是添加的操作 而非引入的操作


修改
elem.setAttribute("name", value);
Q：那为什么不直接document.getElementById("").?来修改呢
A：兄啊，你那主要是拿来改css属性的，
但是关于这个，是能直接改变它的属性(id class等各种并不在css属性范围内)的


删除
elem.removeAttribute("name",value)

3.27新增

在父节点里新增子元素
添加节点

var father = doc.getelemByID(rain)
var me = doc.createElem("myself")
//先定义一个变量指向元素
然后定义一个子元素

可在已有的子节点前插入一个新的子节点
father.insertBefore(me, existingNode(father))

隐患:这样会操作了两次DOM树，而DOM树操作的越多
都会重新布局一次从而降低了服务器的响应速度

还有appendChild() 向父节点添加最后一个子节点
Fathernode.appendChild(son);

扩展:
关于DOM
每操作一次DOM 都会触发布局（layout）和绘制（paint）
layout是渲染成"paint———到显示"前的一步，也就是说它几乎无法避免
所以我们做的应该就是尽量减少layout的出现
默认情况下layout应该是都存储在一次周期的队列中等到js完全执行
之后才会调用一次layout，但是如果你想类似刚刚的添加节点一样快速
的把内容显示出来，那就不得不提前添加一次layout，而这也会导致
DOM的性能问题

所以，我们要做的是，应该把它们都集中一次队列里以优化DOM的次数操作


文档片段 临时保存多个平级的元素(实际上是多个虚拟父元素)[使他们都在一个队列里]

创建片段
var frag = doc.createDocFragment(); //创立fragment
frag.appendChild(child); //将子元素临时追加到fragment中

parent.appendChild(frag) //将frag追加到页面
在append了子节点之后，frag自动释放(如果有父子元素关系就把打包好的父子节点释放)，不会再额外占用下一队列元素

BOM 
类似属性获取与事件执行
从大到小排列
window 整个窗口
screen 屏幕信息(用于获取全屏分辨率等信息以便于转入高分辨率屏适配代码)
navigator 当前浏览器的配置信息(大概用于检测IE以及内核信息)
history 当前窗口的历史url记录
location 当前窗口加载的url
document 当前网页加载的各项内容(HTML/CSS属性)
event 网页中事件机制


例如窗口大小获取
window.outWidth/outHeight 
特别注明:它于截图返回的数值不一样是因为来自于 GetWindowRect 这种有父子关系窗口
而截图工具获取的只有前景窗口
所以应该用.innerWidth/Height



定时器(周期与一次性)
var timer =  setInterval(function(){
exp1;

}
,time)

clearInterval(timer);

与停止,当然必须要先命名 再可以找到定时器的名称并停止

一次性
setTimeout(function{
	一次性执行的东西
	
},3000)
*/