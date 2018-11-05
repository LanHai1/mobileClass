$(function () {
    /*轮播区域*/
    function slideFn() {
        let slide = $(".j_slideShow > ul");
        let slideLis = $(".j_slideShow > ul > li");

        //li数量
        let liCount = slideLis.length + 2;

        //轮播ul的宽度
        slide.css("width", (100 * liCount) + "%");
        //轮播li的宽度
        slideLis.css("width", (100 / liCount) + "%");

        //将第一个li和最后一个li交叉加入ul中
        let slideLiFirst = $(".j_slideShow > ul > li:eq(0)").clone(true);
        let slideLiLast = $(".j_slideShow > ul > li:last-of-type").clone(true);
        slideLiFirst.appendTo(slide);
        slideLiLast.prependTo(slide);

        //让img1显示在第一帧
        function setFirstLiX() {
            slide.css("transform", "translateX(-" + (100 / liCount) + "%)")
        }

        setFirstLiX();
        /*//监听浏览器窗口大小事件
        $(window).on("resize", function () {
            setFirstLiX();
        });*/

        //小圆点
        for (let i = 0; i < slideLis.length; i++) {
            $("<li><a href='#'></a></li>").appendTo($(".j_slideShow>ol"));
        }
        let slideOls = $(".j_slideShow>ol>li");
        //第一个小圆点添加默认样式
        $(".j_slideShow>ol>li:first-of-type").addClass("active");


        /*轮播效果*/
        //图片索引值
        let index = 1;
        //小圆点索引值
        let dot = 0;

        /**
         * 设置小圆点特效
         * @param dot 小圆点索引值
         */
        function setSlideOl(dot) {
            slideOls.eq(dot).addClass("active").siblings("li").removeClass("active");
        }

        /**
         * 设置轮播区域滑动效果
         * @param index 图片索引值
         * @param transition 过渡
         */
        function setSlideUl(index, transition) {
            transition = transition || "none";
            slide.css({
                "transform": "translateX(-" + (100 / liCount) * index + "%)",
                "transition": transition
            });
        }

        //为小圆点注册点击事件 绑定对应的动画
        $(".j_slideShow>ol").on("click", "li", function () {
            index = $(this).index() + 1;
            //调用轮播区域移动效果
            setSlideUl(index);
            dot = $(this).index();
            setSlideOl(dot);
        });

        setInterval(function () {
            index++;
            dot++;
            //ul移动效果
            setSlideUl(index, "transform 1s ease-in-out");
            //ol小圆点样式效果
            setSlideOl(dot);
            if (dot === slideLis.length) {
                dot = 0;
                //调用小圆点特效
                setSlideOl(dot);
            }
            //添加延时器 移动效果做完后再重新轮播
            setTimeout(function () {
                if (index === liCount - 1) {
                    index = 1;
                    //调用轮播区域移动效果
                    setSlideUl(index);
                }
            }, 1500);
        }, 3000);

    }

    slideFn();

    /*固定导航栏透明度*/
    function hedaerOpacity() {
        $(window).scroll(function () {
            //浏览器滚上去的距离
            let scrollTop = $(document).scrollTop();
            //轮播区域的高度
            let slideHeight = $(".j_slideShow>ul").height();
            //设置透明度
            let opacity = scrollTop / slideHeight;
            opacity = opacity > 1 ? 1 : opacity;
            $(".j_view > header").css("background-color", "rgba(233, 35, 34, " + opacity + ")")
        });
    }

    hedaerOpacity();

    /*秒杀定时器*/
    function seckillTimer() {
        //获取自定义属性总时长
        let allTime = Number($(".jd_sk_time")[0].dataset["alltime"]);

        let timer = setInterval(function () {
            allTime--;
            //小时
            let hour = Math.floor(allTime / 3600);
            $(".jd_sk_time>span:eq(0)").html(Math.floor(hour / 10));
            $(".jd_sk_time>span:eq(1)").html(Math.floor(hour % 10));
            //分钟
            let minute = Math.floor(allTime % 3600 / 60);
            $(".jd_sk_time>span:eq(3)").html(Math.floor(minute / 10));
            $(".jd_sk_time>span:eq(4)").html(Math.floor(minute % 10));
            //毫秒
            let second = Math.floor(allTime % 60);
            $(".jd_sk_time>span:eq(6)").html(Math.floor(second / 10));
            $(".jd_sk_time>span:eq(7)").html(Math.floor(second % 10));
            //清理定时
            if (hour === 0 && minute === 0 && second === 0) {
                clearInterval(timer);
            }
        }, 1000);
    }

    seckillTimer();
});