//  0.服务器地址
let bannerServerURL = "https://res.vmallres.com/";


// 1.动态创建li添加图片内容
let imagesEl = document.querySelector(".images");
let activeItemEl = imagesEl.querySelector("active");


for (let i = 0; i < banners.length; i++) {
    let banner = banners[i];
    // 创建li元素
    let itemEl = document.createElement("li");
    itemEl.classList.add("item");
    if (i === 0) {
        // 默认显示第一张图片
        itemEl.classList.add("active");
        activeItemEl = itemEl;
    }
    imagesEl.append(itemEl);
    // 设置itemEl的样式
    itemEl.style.left = `${i * 100}%`;

    // 创建img元素
    let imgEl = document.createElement("img");
    imgEl.src = `${bannerServerURL}${banner.imgUrl}`;

    itemEl.append(imgEl);

}
let realLength = imagesEl.children.length; //真正的数据个数

/* 无缝切换方式改动：
    1. 分别复制第一张和最后一张图片到最后和最前
    2. 在切换图片的函数中，判断图片的索引位置
        * 如果切换到第一张，再往左就切换到第-1张，然后迅速跳转到最后一张
        * 如果切换到最后一张，再往右就切换到leng+1张，然后迅速跳转到第一张
*/

// 改动1：复制第一张和最后一张图片
let firstItem = imagesEl.children[0].cloneNode(true);
let lastItem = imagesEl.children[banners.length - 1].cloneNode(true);
imagesEl.append(firstItem);
imagesEl.prepend(lastItem);
// 更改添加的图片的left值
firstItem.style.left = `${(banners.length) * 100}%`;
lastItem.style.left = '-100%';


// 2.左右切换
let controlEl = document.querySelector(".control");
let leftEl = controlEl.children[0];
let rightEl = controlEl.children[1];

// 创建currentIndex存储播放的图片索引
let currentIndex = 0;
leftEl.addEventListener("click", function() {

    if (isSwitchEnd) {
        switchImagesAction(-1);
    }

});
rightEl.addEventListener("click", function() {
    if (isSwitchEnd) {
        switchImagesAction(1);
    }
});


// 3.切换图片函数
let isSwitchEnd = true; //节流阀，控制边界动画没结束就不能触发切换

function switchImagesAction(offset) {
    isSwitchEnd = false;
    imagesEl.style.transition = "all 1s ease";
    currentIndex = currentIndex + offset;

    let isEdge = false; //判断边界
    if (currentIndex === realLength || currentIndex === -1) {
        isEdge = true;
    }
    //3.1.明面移动图片
    imagesEl.style.transform = `translateX(${-currentIndex * 100}%)`;
    //3.2.调整index
    currentIndex = (currentIndex + banners.length) % banners.length;
    //3.3.改动小圆点
    // 排他思想改变指示器的active类
    activeCircleEl.classList.remove("active");
    activeCircleEl = indicatorEl.children[currentIndex];
    activeCircleEl.classList.add("active");


    if (isEdge) {
        imagesEl.addEventListener("transitionend", function() {
            //3.4.暗中调整
            imagesEl.style.transition = "none";
            imagesEl.style.transform = `translateX(${-currentIndex * 100}%)`;
            isSwitchEnd = true;
        });
        /*   setTimeout(function() {
              //3.4.暗中调整
              imagesEl.style.transition = "none";
              imagesEl.style.transform = `translateX(${-currentIndex * 100}%)`;
          }, 1000) */

    } else {
        isSwitchEnd = true;
    }

}


// currentIndex = (currentIndex + offset + length) % length;
// // 切换样式
// imagesEl.style.transform = `translateX(${-currentIndex * 100}%)`;


// // 排他思想改变图片的active类
// activeItemEl.classList.remove("active");
// activeItemEl = imagesEl.children[currentIndex];
// activeItemEl.classList.toggle("active");

// // 排他思想改变指示器的active类
// activeCircleEl.classList.remove("active");
// activeCircleEl = indicatorEl.children[currentIndex];
// activeCircleEl.classList.add("active");



// 4.同步指示器
let indicatorEl = document.querySelector(".indicator");
// 动态创建指示器
for (let i = 0; i < banners.length; i++) {
    let circleEl = document.createElement("li");
    circleEl.classList.add("item");
    if (i === 0) {
        circleEl.classList.add("active");
    }
    indicatorEl.append(circleEl);
};

// 绑定指示器点击事件，点击同步切换图片，同步指示器active类
let activeCircleEl = indicatorEl.querySelector(".active");
indicatorEl.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        // 排他思想切换指示器的active，切换到对应索引的图片
        activeCircleEl.classList.remove("active");
        event.target.classList.add("active");
        activeCircleEl = event.target;
        let circleIndex = Array.from(indicatorEl.children).findIndex(function(item, index, arr) {
            return item === activeCircleEl;
        });
        switchImagesAction(circleIndex - currentIndex);
    }
})


// 5.自动轮播
function startLunBoFunction(times) {
    // 判断timer是否为空，为空时才开启定时器，为真时返回，避免重复开启定时器
    if (timer) return;
    timer = setInterval(function() {
        rightEl.click();
    }, times);

}

function stopLunBoFunction() {
    // 判断timer是否为空，为真时才关闭定时器，为空时返回，避免重复开启定时器
    if (!timer) return;
    clearInterval(timer);
    timer = null;
}

let timer = null;
// 默认开启定时器
startLunBoFunction(3000);
// 在窗口可见时，开启定时器
window.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "visible") {
        startLunBoFunction(3000);
    } else if (document.visibilityState === "hidden") {
        stopLunBoFunction();
    }
});

let bannerEl = document.querySelector(".banner");
// 监听鼠标事件，进入关闭定时器，离开恢复定时器
bannerEl.addEventListener("mouseenter", function() {
    startLunBoFunction(3000);
});
bannerEl.addEventListener("mouseleave", function() {
    stopLunBoFunction();
});