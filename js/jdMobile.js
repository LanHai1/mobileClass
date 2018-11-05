//页面加载事件
$(function () {
    /*轮播区域*/
    function slide() {
        //轮播区域ul
        let silde_ul = $(".j_slideshow>ul");
        //轮播区域ul下所有li
        let silde_ul_li = $(".j_slideshow>ul>li");

        //设置ul的宽
        let ulWidth = ($(silde_ul_li).length + 2) * 100;
        silde_ul.css("width", ulWidth + "%");
        //设置li的宽
        let ul_liWidth = 100 / ($(silde_ul_li).length + 2);
        silde_ul_li.css("width", ul_liWidth + "%");
        //这里有个小技巧 应该是先添加样式 后追加到ul里 否则后面追加的元素不会有样式 原因是js是一门解释性语言 执行顺序是从上到下从左到右

        //将轮播区域ul第一个li复制再追加值轮播区域ul最后
        let slide_ul_firstLi = $(".j_slideshow>ul>li:eq(0)").clone(true);
        //将轮播区域ul最后一个li复制再追加值轮播区域ul最前
        let slide_ul_last = $(".j_slideshow>ul>li:last-of-type").clone(true);
        slide_ul_firstLi.appendTo(silde_ul);
        slide_ul_last.prependTo(silde_ul);

        //设置小圆点
        let silde_ol = $(".j_slideshow>ol");
        //循环遍历追加ol下的li
        for (let i = 0; i < silde_ul_li.length; i++) {
            $("<li><a href=\"#\"></a></li>").appendTo(silde_ol);
        }
        //为ol下第一个li添加样式
        $(".j_slideshow>ol>li:eq(0)").addClass("active");

        //左偏移ul，让第一幅图在第一帧
        function jSlideShowTX() {
            silde_ul.css("transform", "translateX(-" + $(".j_slideshow").width() + "px)");
        }

        jSlideShowTX();
        //监听浏览器窗口大小事件
        $(window).on("resize", function () {
            jSlideShowTX();
        });
    }

    slide();

    /*固定导航透明度*/
    function headerTop() {
        //获取固定导航
        let j_header = document.querySelector(".j_header");
        //获取轮播图的高度
        let j_slideshowHeight = $(".j_slideshow").height();

        /*设置透明度*/
        function headerRgbA() {
            //获取文档滚动出屏幕的top距离
            let offerTop = $(document).scrollTop();
            //设置rgba中的a 文档滚出屏幕的top距离除以轮播区域的高度
            let opacity = offerTop / j_slideshowHeight;
            console.log(offerTop,j_slideshowHeight,opacity)
            //判断
            opacity = opacity > 1 ? 1 : opacity;
            //设置固定header的透明度
            j_header.style.background = "rgba(233, 35, 34, " + opacity + ")";
        }

        headerRgbA();
        //浏览器滚动事件
        window.onscroll = function () {
            headerRgbA();
        }
    }

    headerTop();

    /*倒计时效果*/
    function timeBakc() {
        //总共时间
        let allTime = 3700;
        let timeSpans = document.querySelector(".jd_sk_time").querySelectorAll("span");
        let timeInterval = setInterval(function () {
            /*每次减1秒*/
            allTime--;
            //小时
            let hour = Math.floor(allTime / 3600);
            //分钟
            let minute = Math.floor(allTime % 3600 / 60);
            //毫秒
            let second = Math.floor(allTime % 60);
            timeSpans[0].innerHTML = Math.floor(hour / 10);
            timeSpans[1].innerHTML = Math.floor(hour % 10);
            timeSpans[3].innerHTML = Math.floor(minute / 10);
            timeSpans[4].innerHTML = Math.floor(minute % 10);
            timeSpans[6].innerHTML = Math.floor(second / 10);
            timeSpans[7].innerHTML = Math.floor(second % 10);
            /*判断是否时间都完成*/
            if (hour === 0 && minute === 0 && second === 0) {
                /*清除定时器*/
                clearInterval(timeInterval);
            }
        }, 1000)
    }

    timeBakc();

});