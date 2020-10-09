// 主页数据加载
console.log("加载完成");
define(["jquery"], function($) {

    function download() {
        $.ajax({
            url: "../data/meizushouji.json",
            success: function(arr) {

                //第一部分数据加载
                var firstData = arr;
                // console.log(firstData);
                renderData(arr)


            }
        })
    }

    function renderData(arr) {

        for (var j = 0; j < arr.length; j++) {
            var str = ` <div class="side">
            <h2>${arr[j].name}</h2>
            <ul class="asideul"> `
            var phone = arr[j].floorAllocations
            for (var i = 0; i < phone.length; i++) {
                str += `
                        <li>
                            <a href="#">
                                <div class="105img">
                                    <img src="${phone[i].img}" alt="" width="230" height="230">
        
                                </div>
                                <div class="font">
                                    <h3>${phone[i].name}</h3>
                                    <p style="height: 18px; overflow: hidden; fontsize=12px">${phone[i].title}</p>
                                    <span style="font-size: 20px; color: red;">${phone[i].skuprice}</span>
                                </div>
        
                            </a>
                        </li>
                `

            }
            str += `</ul>
            </div>`
                // console.log(str);

            $('.seven').append(str)

        }


    }
    return {
        download: download,
    }

})