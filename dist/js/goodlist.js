define(["jquery"], function($) {
    function download() {

        sc_num();
        sc_msg();


        $.ajax({
            type: 'get',
            url: "../data/shoplist.json",
            success: function(arr) {
                let str = ``;
                for (var i = 0; i < arr.length; i++) {
                    str += ` <li class="goods_item">
                <div class="goods_pic">
                    <img src="${arr[i].img}" alt="">
                </div>
                <div class="goods_title">
                    <p>【京东超市】奥利奥软点小草莓0</p>
                </div>
                <div class="sc">
                    <div id="${arr[i].id}" class="sc_btn">加入购物车</div>
                </div>
            </li>`
                }
                $(".goods_box ul").html(str);
            },
            error: function(msg) {
                console.log(msg);
            }
        })

        /*
          将数据存储到cookie中
          1、cookie大小有限
          2、cookie只能存储字符串
          【注】做到只存储关键数据。[{id:id,num:1}]
        */
        $(".goods_box ul").on("click", '.sc_btn', function() {
            var id = this.id; //点击按钮的这个商品的id
            //1、判定是否是第一次添加
            var first = $.cookie("goods") == null ? true : false;
            if (first) {
                var arr = [{ id: id, num: 1 }];
                $.cookie("goods", JSON.stringify(arr), {
                    expires: 7
                })
            } else {
                //不是第一次，判定之前是否添加过
                var same = false; //假设之前没添加过
                var cookieArr = JSON.parse($.cookie("goods"));
                for (var i = 0; i < cookieArr.length; i++) {
                    if (cookieArr[i].id === id) {
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }

                if (!same) {
                    var obj = { id: id, num: 1 };
                    cookieArr.push(obj);
                }

                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            }
            console.log($.cookie("goods"));
            sc_num();
            sc_msg();
            ballMove(this);
        })

        通过事件委托给右侧购物车商品添加事件委托
        $(".sc_right ul").on("click", ".delete_goodsBtn", function() {
            //1、页面上删除
            var id = $(this).closest("li").remove().attr("id");
            //2、通过cookie删除
            var cookieArr = JSON.parse($.cookie("goods"));
            var index = cookieArr.findIndex(item => item.id == id);
            //删除
            cookieArr.splice(index, 1);
            if (cookieArr.length) {
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            } else {
                $.cookie("goods", null);
            }
            sc_num();
        })

        //给+和-添加事件
        $(".sc_right ul").on("click", '.sc_goodsNum button', function() {

            var id = $(this).closest("li").attr("id");
            //从cookie中找出这个id的数据
            var cookieArr = JSON.parse($.cookie("goods"));
            var index = cookieArr.findIndex(item => item.id == id);

            if (this.innerHTML == "+") {
                cookieArr[index].num++;
            } else {
                cookieArr[index].num == 1 ? alert("数量为1，不能减少") : cookieArr[index].num--;
            }
            //改变页面上的数量
            $(this).siblings("span").html("商品数量：" + cookieArr[index].num);
            //将改变完成数量的cookie存储回去
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
            sc_num();
        })


        //计算购物车中商品的数量
        function sc_num() {
            var cookieStr = $.cookie("goods");
            var sum = 0;
            if (cookieStr) {
                var cookieArr = JSON.parse(cookieStr);
                for (var i = 0; i < cookieArr.length; i++) {
                    sum += cookieArr[i].num;
                }
            }
            $(".sc_right .sc_num").html(sum);
        }

        //给右侧购物车添加移入移出效果
        $(".sc_right").mouseenter(function() {
            $(this).stop(true).animate({ right: 0 }, 500);
        }).mouseleave(function() {
            $(this).stop(true).animate({ right: -270 }, 500);
        })

        //进行抛物线运动的函数
        function ballMove(node) {
            //显示小球，并且将小球移动到当前点击按钮的位置
            $("#ball").css({
                left: $(node).offset().left,
                top: $(node).offset().top,
                display: 'block'
            })

            //计算抛物线的偏移位置
            var offsetX = $(".sc_right .sc_pic").offset().left - $(node).offset().left;
            var offsetY = $(".sc_right .sc_pic").offset().top - $(node).offset().top;

            //声明一个抛物线对象
            var bool = new Parabola({
                el: "#ball",
                offset: [offsetX, offsetY],
                duration: 600,
                curvature: 0.001,
                callback: function() {
                    $("#ball").hide();
                }
            })
            bool.start();
        }

        //右侧购物上商品的加载
        //1、购物车数据，都在cookie中id num
        //2、商品信息在，服务器上
        function sc_msg() {
            var cookieStr = $.cookie("goods");
            if (!cookieStr) {
                return;
            }
            //1、请求商品数据
            $.ajax({
                type: 'get',
                url: 'data.json',
                success: function(arr) {
                    //在cookie中取出数据
                    var newArr = []
                    var cookieArr = JSON.parse(cookieStr);
                    for (var i = 0; i < cookieArr.length; i++) {
                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j].id == cookieArr[i].id) {
                                arr[j].num = cookieArr[i].num;
                                newArr.push(arr[j]);
                                break;
                            }
                        }
                    }
                    // console.log(newArr);
                    let str = ``;
                    for (var i = 0; i < newArr.length; i++) {
                        str += `<li id="${newArr[i].id}">
                      <div class="sc_goodsPic">
                          <img src="${newArr[i].img}" alt="">
                      </div>
                      <div class="sc_goodsTitle">
                          <p>这是商品曲奇饼干</p>
                      </div>
                      <div class="sc_goodsBtn">购买</div>
                      <div class="delete_goodsBtn">删除</div>
                      <div class="sc_goodsNum">
                          <div>
                              <button>+</button>
                              <button>-</button>
                              <span>商品数量：${newArr[i].num}</span>
                          </div>
                      </div>
                  </li>`
                    }
                    $(".sc_right ul").html(str);
                }
            })
        }
    }
    return {
        download: download

    }

})