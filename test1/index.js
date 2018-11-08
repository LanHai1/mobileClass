$(function () {
    /*轮播区域*/
    function slideFn() {
        let slide = $(".j_slideShow > ul");
        /*自动轮播定时器*/
        let autoslide = null;
        /*记录轮播过渡效果是否结束*/
        let isEnd = true;

        //将第一个li和最后一个li交叉加入ul中
        let slideLiFirst = $(".j_slideShow > ul > li:eq(0)").clone(true);
        let slideLiLast = $(".j_slideShow > ul > li:last-of-type").clone(true);
        slideLiFirst.appendTo(slide);
        slideLiLast.prependTo(slide);

        let slideLis = $(".j_slideShow > ul > li");
        //li数量
        let liCount = slideLis.length;

        //轮播ul的宽度
        slide.css("width", (100 * liCount) + "%");
        //轮播li的宽度
        slideLis.css("width", (100 / liCount) + "%");

        //让img1显示在第一帧
        function setFirstLiX() {
            slide.css("transform", "translateX(-" + (100 / liCount) + "%)")
        }

        setFirstLiX();

        //监听浏览器窗口大小事件
        $(window).on("resize", function () {
            setFirstLiX();
        });

        //小圆点
        for (let i = 0; i < liCount - 2; i++) {
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

        /*手动轮播*/
        //手指触摸屏幕初始的X，移动中的X，最后的X
        let startX, moveX, X_Li;
        //当前的translateX值
        let newTranslateX;
        slide.on("touchstart", $("li"), function (e) {//手指触摸屏幕
            e = event || e;
            startX = e.targetTouches[0].clientX;
            //清除自动轮播定时器
            clearInterval(slideLis);
            //获取当前元素translateX值
            newTranslateX = parseFloat($(this).css("transform").replace(/[^0-9\-,]/g, '').split(',')[4]);//translateX
        }).on("touchmove", $("li"), function () {//手指移动屏幕
            e = event || e;
            if (isEnd) {
                moveX = e.targetTouches[0].clientX;
                X_Li = moveX - startX;

                //设置手指偏移值 //滑动的时候移动要清除过渡效果否则元素会有延迟
                $(this).css({"transform": "translateX(" + (newTranslateX + X_Li) + "px)", "transition": "none"});
            }
        }).on("touchend", $("li"), function () {//手指移出屏幕
            isEnd = false;
            if (Math.abs(X_Li) > 100) {
                if (X_Li > 0) {
                    index--;
                    dot--;
                } else {
                    index++;
                    dot++;
                }
                setSlideUl(index, "transform 1s ease-in-out");
                setSlideOl(dot);
            } else if (Math.abs(X_Li) > 0) {//回弹效果
                setSlideUl(index, "transform 1s ease-in-out");
                setSlideOl(dot);
            }
            //清零数据（move）
            startX = 0;
            moveX = 0;
            X_Li = 0;
        });

        /*监听元素的过渡效果*/
        slide.on("webkitTransitionEnd", function () {
            if (index === liCount - 1) {//最后一张 索引则是1
                index = 1;
                setSlideUl(index);
                dot = 0;
                //调用小圆点特效
                setSlideOl(dot);
            } else if (index === 0) {//第一张 索引则是总长度减去2
                index = liCount - 2;
                setSlideUl(index);
                /*dot = liCount - 2;
                //调用小圆点特效
                setSlideOl(dot);*/
            }
            setTimeout(function () {
                isEnd = true;
                /*清除之前添加的自动轮播定时器*/
                clearInterval(autoslide);
                //重新开启自动轮播
                autoL_B();
            }, 1000);
        });

        /*自动轮播*/
        function autoL_B() {
            autoslide = setInterval(function () {
                index++;
                dot++;
                //ul移动效果
                setSlideUl(index, "transform 1s ease-in-out");
                //ol小圆点样式效果
                setSlideOl(dot);
                if (dot === slideLis.length - 2) {
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

        autoL_B();
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