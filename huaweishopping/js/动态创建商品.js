// 服务器地址
let serverURL = "https://res.vmallres.com/pimages";

let productEl = document.querySelector(".products");
for (let i = 0; i < resultList.length; i++) {
    // console.log(resultList[i]);
    let resultItem = resultList[i];

    // 将每一条数据转化为页面的一个元素
    // 1.1 搭建最外层的li
    let itemEl = document.createElement("li");
    itemEl.classList.add("item");
    productEl.append(itemEl);

    // 1.2  创建a元素
    let aEl = document.createElement("a");
    aEl.href = "#";
    itemEl.append(aEl);

    // 1.3  添加album
    let albumEl = document.createElement("img");
    albumEl.classList.add("album");
    albumEl.src = `${serverURL}${resultItem.photoPath}428_428_${resultItem.photoName}`;
    aEl.append(albumEl);

    //  1.4 创建name
    let nameEl = document.createElement("div");
    nameEl.classList.add("name");
    nameEl.textContent = resultItem.name;
    aEl.append(nameEl);

    // 1.5  创建promotion
    let promotionEl = document.createElement("div");
    promotionEl.classList.add("promotion");
    promotionEl.textContent = resultItem.promotionInfo;
    aEl.append(promotionEl);

    //  1.6 创建price
    let priceEl = document.createElement("div");
    priceEl.classList.add("price");
    priceEl.textContent = "￥" + resultItem.price;
    aEl.append(priceEl);

    //  1.7 创建service
    let serviceEl = document.createElement("div");
    serviceEl.classList.add("service");
    // 动态创建tip
    for (let label of resultItem.promoLabels) {
        let tipEl = document.createElement("span");
        tipEl.classList.add("tip");
        tipEl.textContent = label;
        serviceEl.append(tipEl);
    }
    aEl.append(serviceEl);

    //  1.8 创建comment
    let commentEl = document.createElement("div");
    commentEl.classList.add("comment");
    // 评价span
    let countEl = document.createElement("span");
    countEl.textContent = `${resultItem.rateCount}人评论`;
    commentEl.append(countEl);
    // 好评span
    let goodEl = document.createElement("span");
    goodEl.textContent = `${resultItem.goodRate}% 好评`;
    commentEl.append(goodEl);
    aEl.append(commentEl);

}