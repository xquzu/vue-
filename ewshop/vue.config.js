module.exports = {
    //webpack配置文件
    configureWebpack : {
        //webpack设置别名插件
        resolve:{
            //指定别名
            alias:{
                'assets':'@/assets',
                '~assets':'@/assets',
                'components':'@/components',
                'network':'@/network',
                'utils':'@/utils',
                'views':'@/utils',

            }
        }
    },
    publicPath:'/',
}
