(function() {
    var observer = document.createElement('script');  //动态引入DOM
    observer.onload = function() {
        var stats = new Stats();
        document.body.appendChild(stats.dom);
        requestAnimationFrame(function loop() {
            stats.update();
            requestAnimationFrame(loop)
        });
    };
    observer.src = 'js/stats.min.js';
    document.head.appendChild(observer);
})()