!
function(e) {
	var t, n, o, i, d, c, s = '<svg><symbol id="home_icon" viewBox="0 0 1024 1024"><path d="M426.666667 853.333333V597.333333h170.666666v256h213.333334V512h128L512 128 85.333333 512h128v341.333333z"  ></path></symbol></svg>',
		a = (a = document.getElementsByTagName("script"))[a.length - 1].getAttribute("data-injectcss");
	if (a && !e.__iconfont__svg__cssinject__) {
		e.__iconfont__svg__cssinject__ = !0;
		try {
			document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
		} catch (e) {
			console && console.log(e)
		}
	}
	function l() {
		d || (d = !0, o())
	}
	t = function() {
		var e, t, n;
		(n = document.createElement("div")).innerHTML = s, s = null, (t = n.getElementsByTagName("svg")[0]) && (t.setAttribute("aria-hidden", "true"), t.style.position = "absolute", t.style.width = 0, t.style.height = 0, t.style.overflow = "hidden", e = t, (n = document.body).firstChild ? (t = n.firstChild).parentNode.insertBefore(e, t) : n.appendChild(e))
	}, document.addEventListener ? ~ ["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(t, 0) : (n = function() {
		document.removeEventListener("DOMContentLoaded", n, !1), t()
	}, document.addEventListener("DOMContentLoaded", n, !1)) : document.attachEvent && (o = t, i = e.document, d = !1, (c = function() {
		try {
			i.documentElement.doScroll("left")
		} catch (e) {
			return void setTimeout(c, 50)
		}
		l()
	})(), i.onreadystatechange = function() {
		"complete" == i.readyState && (i.onreadystatechange = null, l())
	})
}(window);