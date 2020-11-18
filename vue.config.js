constpath = require('path');//引入path模块

function resolve(dir){

    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径

}

module.exports={

    chainWebpack:(config)=>{

        config.resolve.alias

        .set('@',resolve('./src'))

        .set('components',resolve('./src/components'))//set第一个参数：设置的别名，第二个参数：设置的路径

    },
    loaders: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        }
    ],
    rules: [
        {  
         test: /\.scss$/,
         loaders: ["style", "css", "sass"]
       },
    ]
}
