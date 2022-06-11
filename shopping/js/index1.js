window.addEventListener('load', function() {

    let focus = document.querySelector('.focus');
    let imageList = focus.querySelector("ul");
    let circleList = focus.querySelector("ol");
    let arrow_l = document.querySelector('.arrow-l');
    let arrow_r = document.querySelector('.arrow-r');
    // 焦点图片的大小
    let focusWidth = focus.offsetWidth;
    //图片个数
    const length = imageList.children.length;

    // 1. 动态生成小圆圈
    for (let i = 0; i < length; i++) {
        let li = document.createElement('li');
        // 记录小圆圈的索引号
        // li.setAttribute('data-index', i);
        // 小圆圈li添加到ol
        circleList.appendChild(li);

        li.onclick = function() {
            switchBanner(i - currentImageIndex);
        }
    };

    //2.增加鼠标进入离开特效
    focus.addEventListener("mouseenter", function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timeId);
        console.log(timeId);
        timeId = null; //清空定时器内存
    });
    focus.addEventListener("mouseleave", function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timeId = lunboByTimes(2000);
    });

    //3.实现轮播图手动切换
    let currentImageIndex = 0;
    circleList.children[currentImageIndex].className = 'current'; //给第一个小圆圈加上current类

    arrow_l.onclick = function() {
        switchBanner(-1);
    };
    arrow_r.onclick = function() {
        switchBanner(1);
    };
    //切换图片的关键函数 offset代表偏移量
    function switchBanner(offset) {
        currentImageIndex = currentImageIndex + offset;
        if (currentImageIndex >= length) {
            currentImageIndex = currentImageIndex - length;
        } else if (currentImageIndex < 0) {
            currentImageIndex = currentImageIndex + length;

        }
        //currentImageIndex = (currentImageIndex + length + offset) % length;

        imageList.style.transform = `translateX(${-focusWidth * currentImageIndex}px)`;
        imageList.style.transition = `all .3s ease`;

        for (let i = 0; i < length; i++) {
            let circle = circleList.children[i];
            circle.className = '';
        }
        circleList.children[currentImageIndex].className = 'current';
    }

    //4.定时轮播图
    function lunboByTimes(time) {
        return this.setInterval(function() {
            arrow_r.click();
        }, time);
    }
    let timeId = lunboByTimes(2000);
    console.log(timeId);

});