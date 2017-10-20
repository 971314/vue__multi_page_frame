module.exports = {
    devPort: 8082,
    projectConfig: [{
        //项目名称
        projectName: "consult",   //testconsult
        //项目根路径
        projectPrefix: "consult",      //http://192.168.6.49:8080(本地)
        //开发代理服务地址
        proxyServer: "http://101.226.207.142:8890", //http://61.172.197.204:8890
        // 生产请求服务地址
        productionServer: "http://101.226.207.142:8890", //http://101.226.207.142:8890
    }, {
        //项目名称
        projectName: "info",           //testinfo
        //项目根路径
        projectPrefix: "info",
        //开发代理服务地址
        proxyServer: "http://101.226.207.142:8890",
        // proxyServer: "http://101.226.207.142:8890",
        // 生产请求服务地址
        productionServer: "http://101.226.207.142:8890",
    }],
    //图片服务器前缀
    // PrefixImg: "https://static.yunyesoft.com/fsimg",
    PrefixImg: "https://pbsq.pobo.net.cn/fsimg",
    //微信项目菜单栏配置
    WxMenuConf: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx638babfb858e32f8&redirect_uri=http%3a%2f%2fservice.yunyesoft.com%2fjifen%2findex.html%3fpath%3d${path}%26params%3d${params}%26merchantNum%3d${merchantNum}&response_type=code&scope=snsapi_base&state=mineauth#wechat_redirect"
}
