import "../css/div_style.css";
import"../css/title_style.less";
import zznhImage from "../img/zznh.png";
import "../css/bg_style.less"


// 获取div元素
const divEl = document.querySelector("div");
divEl.textContent = "Hello World";
divEl.classList.add("content");

document.body.append(divEl);


// 创建h2元素
const titleEl = document.createElement("h2");
titleEl.textContent = "哈哈哈哈";
titleEl.classList.add("title");
document.body.append(titleEl);


// 创建img元素
const imgEl = document.createElement("img");
imgEl.src = zznhImage;
document.body.append(imgEl);

// 创建div元素，设置背景
const divBgEl = document.createElement("div");
divBgEl.classList.add("img-bg");
document.body.append(divBgEl);