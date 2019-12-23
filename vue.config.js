// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)
module.exports={
    outputDir: 'dist',
    assetsDir: '',
    indexPath: 'index.html',
    filenameHashing: true,
    pages: {
        index:{
            entry: 'examples/main.js',
        }
    },
    lintOnSave: true,
    chainWebpack: config => {
        config.resolve.alias
            .set('@',resolve('src'))
    }
}
