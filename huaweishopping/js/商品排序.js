/* 
    1.监听排序Item的点击
        *排他思想改变每个Item的active类
    2. 获取点击的信息（比如评论数、好评等等）
    3.根据点击的信息，对数据重新排序
    4.将排序后的数据重新展示
*/

// 1.监听item的点击事件
let sortEl = operationEl.querySelector(".sort");
let activeSortItem = sortEl.querySelector(".active");
// 提取item信息存储到数组sortKeys中，也可以给对应item加data-key属性
// let sortKeys = ["default", "goodRate", "rateCount", "price"]

for (let i = 1; i < sortEl.children.length; i++) {
    let sortItemEl = sortEl.children[i];
    sortItemEl.index = i;

    sortItemEl.addEventListener("click", function() {
        // 排他思想改变每个Item的active类
        activeSortItem.classList.remove("active");
        this.classList.add("active");
        // 记录最新的activeSortItem
        activeSortItem = this;

        // 2.获取点击的信息
        let key = this.dataset.key;


        // 3.根据点击的信息，对数据重新排序并展示
        sortResultListAction(key);
        //  4.调用服务优惠筛选.js中的 addEmptyLiAction()
        addEmptyLiAction();
    })
}

// 封装函数，通过key对数据进行排序
function sortResultListAction(key) {
    if (key === "default") {
        // 默认情况展示过滤后的数据而不是原始数据
        // 调用服务优惠筛选.js中的 filterResultListFunction()
        filterResultListFunction()
    } else {
        // sort（）方法会改变原数组，所以这里可以直接对showResultList进行排序
        showResultList.sort(function(item1, item2) {
            // 降序排序
            return item2[key] - item1[key];
        });

        // 调用服务优惠筛选.js中的showResultListFunction()，本身就已经是对过滤后的数据进行操作，不用再过滤了
        showResultListFunction();
    }
}