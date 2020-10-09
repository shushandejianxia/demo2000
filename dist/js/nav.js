define(["jquery"], function($) {
    function download() {
        //数据下载
        $.ajax({
            url: "../data/nav.json",
            success: function(data) {
                //轮播图
                var bannerArr = data.banner;
                for (var i = 0; i < bannerArr.length; i++) {
                    $(`<li> <a href="#" class="bannerimages"alt=""><img src="/images/banner/${bannerArr[i].img}" alt=""></a></li>`).appendTo("#banner ul");
                }


            },
            error: function(msg) {
                console.log(msg);
            }

        })

        //导航移入移出效果
        $("#header-link-nav #one").mouseenter(function() {
            $('.goodsList').css("display", "block");
            console.log("1");
        }).mouseleave(function() {
            $('.goodsList').css("display", "none");
        })
        $("#header-link-nav #two").mouseenter(function() {
            $('.goodsList2').css("display", "block");
            console.log("1");
        }).mouseleave(function() {
            $('.goodsList2').css("display", "none");
        })
        $("#header-link-nav #three").mouseenter(function() {
            $('.goodsList3').css("display", "block");
            console.log("1");
        }).mouseleave(function() {
            $('.goodsList3').css("display", "none");
        })
        $("#header-link-nav #four").mouseenter(function() {
            $('.goodsList4').css("display", "block");
            console.log("1");
        }).mouseleave(function() {
            $('.goodsList4').css("display", "none");
        })

        // topDownload();   

    }

    function topDownload() {
        $.ajax({
            url: "../data/nav.json",
            success: function(data) {
                var topNavArr = data.topNav;
                top
            }
        })
    }


    function banner() {

        var iNow = 0;
        var aImgs = null;
        var aBtns = null;
        var timer = setInterval(function() {
            iNow++;
            tab();

        }, 2500);

        function tab() {
            if (!aImgs) {
                aImgs = $("#banner ul").find("a");
            }

            if (iNow == 5) {
                iNow = 0;
            }

            //图片切换
            aImgs.hide().css("opacity", 0.2).eq(iNow).show().animate({ opacity: 1 }, 500);
            //对应的小圆圈指定当前是哪张图片显示


            //添加移入移出
            $("#banner").mouseenter(function() {
                clearInterval(timer);
            });
            $("#banner").mouseleave(function() {
                timer = setInterval(function() {
                    iNow++;
                    tab();

                }, 2500);
            });



            //给上一张和下一张添加点击事件
            // $(".swiper-button-prev,.swiper-button-next").on("click", function(){
            //     if(this.className == "swiper-button-prev"){
            //         iNow--;
            //         if(iNow == 0){
            //             iNow == 4;
            //         }
            //     }else{
            //         iNow++;
            //     }
            //     tab();
            // })

        }

    }

    return {
        banner: banner,
        download: download,

    }



})