// 等HTML + CSS加载完毕再加载JS
window.addEventListener('load', function() {
    let preview_img = document.querySelector('.preview_img');
    let big = document.querySelector('.big');
    let mask = document.querySelector('.mask');

    // 鼠标经过preview_img 小图片盒子， 黄色的遮挡层 和 大图片盒子显示，
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    });

    // 鼠标离开 preview_img 就隐藏 mask 遮挡层 和 big 大盒子
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    });

    // 黄色的遮挡层跟随鼠标功能。
    preview_img.addEventListener('mousemove', function(e) {
        // 先计算出鼠标在盒子内的坐标
        let x = e.pageX - this.offsetLeft;
        let y = e.pageY - this.offsetTop;
        // 坐标值减去mask盒子自身宽度的一半,这样鼠标就在盒子中间了
        let maskX = x - mask.offsetWidth / 2;
        let maskY = y - mask.offsetHeight / 2;
        // 让mask保持在preview_img盒子内部
        // mask最大移动距离
        let maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            // mask x轴最大移动距离
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) { //宽高一样所以这里y轴最大移动距离不变
            // mask y轴最大移动距离
            maskY = maskMax;
        }

        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        // 移动黄色遮挡层，大图片跟随移动功能。
        let bigIMg = document.querySelector('.bigImg');
        // 大图片的最大移动距离
        let bigMax = bigIMg.offsetWidth - big.offsetWidth;
        // 大图片的移动距离 / 大图片最大移动距离= 遮挡层移动距离  / 遮挡层的最大移动距离
        let bigX = maskX * bigMax / maskMax;
        let bigY = maskY * bigMax / maskMax;
        bigIMg.style.left = -bigX + 'px';
        bigIMg.style.top = -bigY + 'px';

    });

})