console.log("输入成功")
    /*
    配置当前项目引入的模块
     */
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        //引入banner图效果
        "nav": "nav",

        "indexdata": "indexdata"


    },
    shim: {
        "jquery-cookie": ["jquery"],
        "parabola": {
            exports: "_"
        }

    }
})
require(["nav", "indexdata"], function(nav, indexdata) {
    nav.download();
    nav.banner();
    indexdata.download();
})