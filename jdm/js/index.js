window.addEventListener('load', function() {
    // 调用swiper  轮播图模块
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // 点击关闭header区域
    let headerEl = document.querySelector(".app");
    let closeBtnEl = headerEl.querySelector(".close-btn")

    headerEl.addEventListener('click', function(event) {
        if (event.target === closeBtnEl) {
            this.style.height = 0;
            this.style.transition = 'all .3s ease-out';
            /*   setTimeout(function() {
                  // 300ms后移除header部分
                  headerEl.remove();
              }, 300) */
        }
    })
    headerEl.addEventListener('transitionend', function() {
        this.remove();
    })

})