// 服务器地址
let serverURL = "https://res.vmallres.com/pimages";

let productEl = document.querySelector(".products");
for (let i = 0; i < resultList.length; i++) {
    // console.log(resultList[i]);
    let resultItem = resultList[i];

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