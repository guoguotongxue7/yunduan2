$(function () {

    // 获取jQuery元素
    const $searchHouseInput = $(".header .house-search");
    const $searchList = $(".header .search-list");
    const $searchTips = $(".header .search-tips");
    const $searchMenuUl = $(".header .search-menu > ul");
    const $searchArrow = $(".header .arrow");

    // 数据
    let cacheSearchListData = [];// 热门搜索数据缓存
    let homePageInfoData = {};// 首页所有的数据缓存
    let currentSearchPlaceHolder = "请输入区域、商圈或小区名开始";
    let currentSearchBarSelector = "site";

    // 页面初始化
    initPage();

    /*------------------------ 搜索框事件的监听-------------------- */
    // 搜索列表的展示
    $searchHouseInput.on("focus", function () {
        // 1. 搜索框有数据则进行搜索
        let value = $(this).val();
        if (value.trim()) {
            // 触发用户输入事件，搜索结果
            $(this).trigger("input");
            return
        }


        // 2. 搜索框没有数据就先展示热门推荐的缓存数据，防止每次focus都请求一次数据
        if (cacheSearchListData.length) {
            // 展示热门搜索的缓存（一般会定期更新一下缓存）
            renderSearchList(cacheSearchListData);
            return
        }

        // 3.没有缓存数据，则发起网络请求，获取热门推荐的数据
        GGReq.get(GGAPI.HOT_RECOMMEND)
            .then(function (res) {

                // searchListData存储搜索框的提示文字列表
                let searchListData = res.rent_house_list.list || [];
                if (!searchListData) return

                //  searchListData体积较大，目前我们只需要用到一个接口，所以这里做一个映射处理，将复杂数据简化为简单的数据
                searchListData = searchListData.map(item => {
                    return {
                        title: item.hdic_resblock_name
                    }
                })

                cacheSearchListData = searchListData;
                // 热门搜索展示
                renderSearchList(searchListData);
            })
    })

    // 搜索框列表的隐藏
    $searchHouseInput.on("blur", function () {
        $searchTips.css("display", "none");
    })

    // 搜索框输入事件
    $searchHouseInput.on("input", debounce(function () {
        let value = $(this).val();// 输入的信息
        let curLocation = homePageInfoData.curLocation;// 首页的城市信息

        GGReq.get(GGAPI.HOUSE_SEARCH, {
            cityId: curLocation.cityCode,
            cityName: curLocation.city,
            channel: currentSearchBarSelector,
            keyword: value,
            query: value,
        })
            .then(function (res) {
                //  console.log(res.data.result);

                const houseSearchData = res.data.result || [];
                // 复杂数据简化，把提示文字改为房子搜索的结果
                searchListData = houseSearchData.map(function (item) {
                    return {
                        title: item.hlsText || item.text
                    }
                })
                //  展示搜索结果
                renderSearchList(searchListData);
            })
    }))

    /* --------------------------导航栏切换--------------------------- */
    $searchMenuUl.on("click", "li", function () {
        // 1. 利用排他思想，修改li的高亮样式
        const $li = $(this);
        $li.addClass("active").siblings().removeClass("active");

        // 2. 移动箭头位置
        let liWidth = $li.width();
        let position = $li.position();
        let arrowLeft = liWidth / 2 + position.left;
        $searchArrow.css("left", arrowLeft);

        // 3. 修改placeholder
        $searchHouseInput.prop({
            placeholder: currentSearchPlaceHolder + $li.text()
        })

        // 4. 拿到li绑定的data-key
        // console.log($li.data("key"));
        currentSearchBarSelector = $li.data("key")

    })

    /* ---------------------------定义的函数------------------------ */

    // 页面初始化函数
    function initPage() {
        // 1. 拿到首页的数据
        GGReq.get(GGAPI.HMOE_PAGE_INFO)
            .then(function (res) {
                // 2. 缓存首页数据
                homePageInfoData = res;

                // 3. 渲染首页地址
                renderHeaderAddress(res);

                // 3. 渲染搜索栏
                renderSearchBar(res);

            }).catch(function (err) {
                console.log("get err: ", err);
            })
    }

    // 更新地址函数
    function renderHeaderAddress(res) {
        let addr = res.curLocation || {};
        $(".header .address").text(addr.city);
    }

    // 展示搜索列表函数
    function renderSearchList(searchListData = []) {
        let htmlString = "<li><span>热门搜索</span></li>";
        searchListData.forEach(function (item) {
            htmlString += `
            <li><span>${item.title}</span></li>
            `
        })

        $searchList.empty().append(htmlString);
        $searchTips.css("display", "block");
    }

    // 渲染搜索框placeholder
    function renderSearchBar(res) {
        let searchBarData = res.searchMenus || [];
        let htmlString = "";

        searchBarData.forEach(function (item, index) {
            const active = index === 0 ? "active" : "";
            htmlString += `
            <li class="item ${active}" data-key="${item.key}"><span>${item.title}</span></li>
            `;
        })

        $searchMenuUl.empty().append(htmlString);
    }
})