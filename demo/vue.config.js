const path = require('path')
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports = {
  css: {
    // loaderOptions: {
    //   sass: {
    //     includePaths: [path.join(__dirname, 'styles')]
    //   },
    // }
  },
  chainWebpack:(config)=>{
    config.resolve.alias
    .set('var',resolve('./styles/_var.scss'))
    //set第一个参数：设置的别名，第二个参数：设置的路径　　
	}
}
