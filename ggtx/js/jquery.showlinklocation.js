// 插件编写，一般写在立即执行函数内部
; (function (window, $) {
    // 在jQuery的原型上添加实例方法showlinklocation()

    $.fn.showlinklocation = function () {
        console.log(this);         // this -> 调用showlinklocation方法的jQuery对象
        this.filter('a').each(function () {
            console.log(this);    // this -> a元素 (DOM Element)
            var $a = $(this);         
            var link = $a.attr('href');
            $a.append(`(${link})`)
        })
        return this               // 返回处理后的jQuery对象
    }

})(window, jQuery)