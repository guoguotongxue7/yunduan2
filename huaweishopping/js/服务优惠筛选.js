// 服务器地址
let serverURL = "https://res.vmallres.com/pimages";

let productEl = document.querySelector(".products");



// 服务优惠筛选
/*  1.获取服务优惠的每个item
    2.监听item的点击，切换active类
    3.根据item的点击，选择获取filterItem
    4.将filterItem放到discountFilters数组中，作为过滤的条件
    5.根据最新的filterItem，filterResultListFunction()过滤数据
    6.根据过滤后的最新数据，showResultListFunction()重新创建商品列表
    */
let operationEl = document.querySelector(".operation");
let discountEl = operationEl.querySelector(".discount");
// 定义变量discountFilters来存储过滤条件
let discountFilters = [];
for (let i = 1; i < discountEl.children.length; i++) {

    let discountItem = discountEl.children[i];
    discountItem.addEventListener("click", function() {
        this.classList.toggle("active");
        // 点击后，如果是active类就根据条件过滤
        if (this.classList.contains("active")) {
            // 将过滤条件存入discountFilters数组
            discountFilters.push(this.textContent.trim())
        } else {
            // 点击后取消了active类，就把这个对应的过滤条件删掉
            let filterItem = this.textContent.trim();
            // 根据点击到的元素文本查找到索引
            let filterIndex = discountFilters.findIndex(function(item) {
                return item === filterItem;
            })
            discountFilters.splice(filterIndex, 1);

        }
        // 调用过滤函数
        filterResultListFunction();

    })
}


// 封装过滤函数：过滤resultList数据
let showResultList = resultList; //默认全部数据，有过滤条件时再修改

function filterResultListFunction() {
    // 动态创建的部分，不以resultList来循环遍历，而以过滤后的showResultList来遍历
    showResultList = resultList.filter(function(item) {
        let isFlag = true;
        for (let filterItem of discountFilters) {
            // 如果resultList里的一个item不包含对应的services属性，就过滤掉这个item，返回false
            if (!item.services.includes(filterItem)) {
                isFlag = false;
                break;
            }
        }

        return isFlag;
    })
    console.log(showResultList);
    // 调用数据展示函数，重新展示数据
    showResultListFunction();
}


// 封装函数： for循环展示数据
showResultListFunction(); //默认调用

function showResultListFunction() {
    // 先清空之前的内容
    productEl.innerHTML = '';
    // 动态创建商品列表
    for (let i = 0; i < showResultList.length; i++) {
        // console.log(resultList[i]);
        let resultItem = showResultList[i];

        // 将每一条数据转化为页面的一个元素
        let itemEl = document.createElement("li");
        itemEl.classList.add("item");

        // 动态创建service里的span
        let serviceEString = '';
        for (let label of resultItem.promoLabels) {
            serviceEString += ` <span class="tip">${label}</span>`;
        }

        // item内容
        itemEl.innerHTML = `
        <a href="#">
            <img class="album" src="${serverURL}${resultItem.photoPath}428_428_${resultItem.photoName}" alt="">
            <div class="name">${resultItem.briefName}</div>
            <div class="promotion">${resultItem.promotionInfo}</div>
            <div class="price">￥${resultItem.price}</div>
            <div class="service">
               ${serviceEString}
            </div>
            <div class="comment">
                <span>${resultItem.rateCount}人评价</span>
                <span>${resultItem.goodRate}% 好评</span>
            </div>
        </a>
    `;


        productEl.append(itemEl);
    }
}