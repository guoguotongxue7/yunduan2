//  0.服务器地址
let bannerServerURL = "https://res.vmallres.com/";


// 1.动态创建li
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

    // 创建img元素
    let imgEl = document.createElement("img");
    imgEl.src = `${bannerServerURL}${banner.imgUrl}`;
    itemEl.append(imgEl);

}

// 2.左右切换
let controlEl = document.querySelector(".control");
let leftEl = controlEl.children[0];
let rightEl = controlEl.children[1];

// 创建currentIndex存储播放的图片索引
let currentIndex = 0;
leftEl.addEventListener("click", function() {
    switchImagesAction(-1);
});
rightEl.addEventListener("click", function() {
    switchImagesAction(1);
});

// 3.切换图片函数
function switchImagesAction(offset) {
    currentIndex = (currentIndex + offset + imagesEl.children.length) % imagesEl.children.length;

    // 排他思想改变图片的active类
    activeItemEl.classList.remove("active");
    activeItemEl = imagesEl.children[currentIndex];
    activeItemEl.classList.toggle("active");

    // 排他思想改变指示器的active类
    activeCircleEl.classList.remove("active");
    activeCircleEl = indicatorEl.children[currentIndex];
    activeCircleEl.classList.add("active");
}

// 4.同步指示器
let indicatorEl = document.querySelector(".indicator");
// 动态创建指示器
for (let i = 0; i < imagesEl.children.length; i++) {
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
function lunBoFunction(times) {
    return setInterval(function() {
        rightEl.click();
    }, times);
}

// 默认开启定时器
let bannerEl = document.querySelector(".banner");

let timer = lunBoFunction(3000);
// 监听鼠标事件，进入关闭定时器，离开恢复定时器
bannerEl.addEventListener("mouseenter", function() {
    clearInterval(timer);
    timer = null;
});
bannerEl.addEventListener("mouseleave", function() {
    timer = lunBoFunction(3000);
});