window.addEventListener('load', function() {
    let focus = document.querySelector('.focus');
    let ul = focus.children[0];
    let ol = focus.children[1];
    // 获得focus自身宽度
    let w = focus.offsetWidth;

    // 利用定时器自动轮播图片
    let index = 0;
    let timer = setInterval(function() {
        index++;
        let translatex = -index * w;
        ul.style.transition = 'all .3s';

        // 记得把距离转换为字符串类型,这种方式移动端兼容性良好,PC端兼容性不太好
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);

    // 等ul移动过渡完成后,再去判断  监听过渡完成的事件
    ul.addEventListener('transitionend', function() {
        // 无缝滚动 
        // 如果index=3 就走到了最后一张图片,此时需要快速复原到第一张图
        if (index >= 3) {
            index = 0;
            let translatex = -index * w;

            // 此时要去掉过渡,快速跳转
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + translatex + 'px)';

        } else if (index < 0) {
            index = 2;
            let translatex = -index * w;

            // 此时要去掉过渡,快速跳转
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }

        // 小圆点类名跟随变化
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    });

    // 手指拖动元素切换图片
    let startx = 0;
    let movex = 0;
    // 节流阀
    let flag = false;
    // 触摸元素,获取手指初始坐标
    ul.addEventListener('touchstart', function(e) {
        startx = e.targetTouches[0].pageX;
        // 手指拖动,停止轮播图自动播放
        clearInterval(timer);
    });
    // 移动手指,获取元素终点坐标
    ul.addEventListener('touchmove', function(e) {
        // 移动距离 = 终点坐标-初始坐标
        movex = e.targetTouches[0].pageX - startx;
        // 元素移动距离= 自身坐标+移动距离
        let translatex = -index * w + movex;
        // 手指拖动不需要过渡效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        // 开启节流阀,控制touchend事件在移动事件结束后再执行,防止用户未拖动但在手指离开时也会执行touchend事件
        flag = true;
        e.preventDefault(); //取消默认行为
    });
    // 手指松开,根据移动距离分类处理
    ul.addEventListener('touchend', function() {
        // 只有touchmove移动事件结束时flag=true才执行下面的程序
        if (flag) {
            if (Math.abs(movex) > 50) {
                // 右滑则播放上一张
                if (movex > 0) {
                    index--
                }

                // 左滑则播放下一张
                if (movex < 0) {
                    index++;
                }
            }
            // 计算最新移动距离
            let translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
            // 节流阀关闭
            flag = false;
        }
        // 开启定时器(先清除所有定时器,再开启)
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            let translatex = -index * w;
            ul.style.transition = 'all .3s';

            // 记得把距离转换为字符串类型,这种方式移动端兼容性良好,PC端兼容性不太好
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);

    });


    // 返回顶部
    let goBack = document.querySelector('.goBack');
    let nav = document.querySelector('nav');
    window.addEventListener('scroll', function(e) {
        // 页面滑动到nav时 goBack才显示
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';

        }
    });
    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    })
})