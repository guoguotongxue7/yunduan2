window.addEventListener('load', function() {
    let arrow_l = document.querySelector('.arrow-l');
    let arrow_r = document.querySelector('.arrow-r');
    let focus = document.querySelector('.focus');
    // 焦点图片的大小
    let focusWidth = focus.offsetWidth;

    // 1. 鼠标经过轮播图模块，左右按钮显示，离开隐藏左右按钮。
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';

        // 清除自动播放定时器
        clearInterval(timer);
        // 清除定时器变量
        timer = null;
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 调用自动播放定时器;
        timer = setInterval(function() {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);
    });

    // 2. 动态生成小圆圈
    let ol = focus.querySelector('ol');
    let ul = focus.querySelector('ul');
    for (let i = 0; i < ul.children.length; i++) {
        let li = document.createElement('li');
        // 记录小圆圈的索引号
        li.setAttribute('data-index', i);
        // 小圆圈li添加到ol
        ol.appendChild(li);

        // 3. 小圆圈的派他思想,在生成小圆圈时直接绑定
        li.addEventListener('click', function() {
            // 先排他
            for (let j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            };
            // 再给自己设置样式
            this.className = 'current';

            // 4. 点击小圆圈,利用封装好的动画js文件animate.js移动图片(移动的是ul而不是li)
            let index = this.getAttribute('data-index');
            // 当我们点击了某个li 就把索引号给num和 circle
            num = index;
            circle = index;
            // ul的移动距离为 小圆圈的索引号 * 图片的宽度  左负右正
            animate(ul, -index * focusWidth);

        });
    };
    // 默认第一个小圆圈开始轮播,设置类名current
    ol.children[0].className = 'current';

    // 5. 克隆第一张图片,放到ul最后
    /*  这里复制第一张图片,是因为右键点击切换图片时,切换到最后一张直接跳转第一张,这样就没有动画效果了
    复制第一张图片放到最后, 先动画切换到复制的这张图, 再切换到第一张, 肉眼察觉不到, 就能够实现无缝切换 */
    let first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // 6.点击右侧按钮,图片移动一张
    // 定义一个num变量,num相当于图片索引,控制ul的移动
    let num = 0;
    // 小圆圈随着图片一起变化,定义一个circle变量来控制小圆圈的类名'current'变化
    let circle = 0;
    // flag节流阀
    let flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            // 关闭节流阀
            flag = false;
            // 如果切换到最后一张复制的图片,ul快速复原,num从0重新开始
            if (num == ul.children.length - 1) { //length-1是因为多克隆了一张图片
                ul.style.left = 0;
                num = 0;
            }
            //图片索引加1,ul移动一个图片的距离
            num++;
            // ul的移动距离为 num * 图片的宽度  左负右正
            animate(ul, -num * focusWidth, function() {
                // 动画执行完毕后,回调函数打开节流阀
                flag = true;
            });

            //  7. 小圆圈随着图片的移动而对应变化
            circle++;
            // 切换到最后一个克隆的图片时,circle从0开始
            if (circle == ol.children.length) {
                circle = 0;
            }

            circleChange();
        }

    });

    // 8. 点击左侧按钮,图片移动
    arrow_l.addEventListener('click', function() {
        if (flag) {
            // 关闭节流阀
            flag = false;
            // 如果切换到第一张复制的图片,ul跳到最后一张克隆的图,num从最后重新开始
            if (num == 0) {
                num = ul.children.length - 1; //length-1是因为多克隆了一张图片
                ul.style.left = -focusWidth * num + 'px';
            }
            //图片索引减1,ul移动一个图片的距离
            num--;
            // ul的移动距离为 num * 图片的宽度  左负右正
            animate(ul, -num * focusWidth, function() {
                // 回调函数打开节流阀
                flag = true;
            });

            //  小圆圈随着图片的移动而对应变化
            circle--;
            // 切换到第一张图片时,circle从最后一个开始
            circle < 0 ? circle = ol.children.length - 1 : circle;
            circleChange();

        }


    });

    // 封装改变小圆圈类名的函数
    function circleChange() {
        // 利用排他思想动态改变小圆圈的类名
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        };
        ol.children[circle].className = 'current';
    }

    // 9. 自动播放轮播图
    let timer = setInterval(function() {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000)


})