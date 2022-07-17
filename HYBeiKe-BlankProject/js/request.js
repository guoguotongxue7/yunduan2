; (function (window, jQuery) {
    // 公共请求 request -> $.ajax
    function request(config = {}) {
        return $.ajax({
            url: config.url || "",
            method: config.method || "get",
            timeout: config.timeout || 5000,
            data: config.data || {},
            headers: config.headers || {},
            ...config
        })
    }

    // get -> $.get
    function get(url, data, config) {
        return request({
            url,
            method: "get",
            data,
            ...config
        })
    }

    // post -> $.post
    function post(url, data, config) {
        return request({
            url,
            method: "post",
            data,
            ...config
        })
    }
    window.GGReq = {
        request,
        get,
        post
    }
})(window, jQuery)