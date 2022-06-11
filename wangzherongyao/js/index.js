window.addEventListener("load", function() {
    // 导航部分
    let recommand = document.querySelector('.recommand');
    let topSelect = document.querySelector('.top-select');
    recommand.addEventListener('mouseenter', function() {
        topSelect.style.display = 'block';
    });
    recommand.addEventListener('mouseleave', function() {
        topSelect.style.display = 'none';
    });


    // 主体部分tab栏切换
    let tabControlEl = document.querySelector(".tab_control");
    // activeItem记录active类的item
    let activeItem = tabControlEl.querySelector(".active");
    tabControlEl.addEventListener("mouseover", function(event) {

        if (event.target.classList.contains("item")) {
            // 1.排他
            activeItem.classList.remove("active");
            // 2.给需要的元素添加样式
            event.target.classList.add("active");

            //记录最新的active类给对应的item
            activeItem = event.target;
        }
    });



    // 轮播图
    let imageListEl = document.querySelector(".image-list");
    let titleListEl = document.querySelector(".title-list");
    // activeEl存储acitve类的图片标题li
    let activeLiEl = titleListEl.querySelector(".active");
    // currentImgIndex存储现在播放的图片索引，默认为0开始
    let currentImgIndex = 0;

    let timerId = null;

    let imgWidth = 605;

    // 1.点击图片标题切换相应图片
    titleListEl.addEventListener("mouseover", function(event) {


        let itemEl = event.target.parentElement;

        // if (event.target.tagName === 'A') {
        if (itemEl.classList.contains("item")) {

            // 切换图片
            /*            for (var i = 0; i < titleListEl.children.length; i++) {
                         if (titleListEl.children[i] === itemEl) break
                       } */
            // Array.form()可以将可迭代的类数组对象转换为数组，findIndex()是数组查找子元素索引的方法
            let index = Array.from(titleListEl.children).findIndex(function(item) {
                return item === itemEl
            });
            // 最新的图片索引值赋值给currentImgIndex
            currentImgIndex = index;
            switchImg();

        }
    });

    // 2.自动轮播函数


    function lunBo(time) {
        return setInterval(function() {
            currentImgIndex++;
            // 图片切换到最后一张时，从第一张重新开始
            if (currentImgIndex === imageListEl.children.length) {
                currentImgIndex = 0;
            }
            switchImg();

        }, time);
    };
    timerId = lunBo(3000);

    // 3.切换图片函数
    function switchImg() {
        // currentImgIndex = (currentImgIndex + offset + imageListEl.children.length) % imageListEl.children.length;
        imageListEl.style.transform = `translateX(${-imgWidth*currentImgIndex}px)`;
        imageListEl.style.transition = `all .3s ease`;

        // 排他思想同步图片的active类
        activeLiEl.classList.remove("active");
        titleListEl.children[currentImgIndex].classList.add("active");
        // 同步最新的activeLiEl
        activeLiEl = titleListEl.children[currentImgIndex];

    }

    // 4.移除定时器
    let bannerEl = document.querySelector(".banner");
    bannerEl.addEventListener('mouseenter', function() {
        // 监听到鼠标进入banner就停止自动轮播，清除定时器
        clearInterval(timerId);
        timerId = null;
    });
    bannerEl.addEventListener('mouseleave', function() {
        // 监听到鼠标离开banner就停止自动轮播，清除定时器
        timerId = lunBo(3000);
    })

})