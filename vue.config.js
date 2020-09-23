const path = require('path')

const resolve = dir => {
	return path.join(__dirname, dir)
}



module.exports = {
	// Project deployment base
	// By default we assume your app will be deployed at the root of a domain,
	// e.g. https://www.my-app.com/
	// If your app is deployed at a sub-path, you will need to specify that
	// sub-path here. For example, if your app is deployed at
	// https://www.foobar.com/my-app/
	// then change this to '/my-app/'
	publicPath: process.env.NODE_ENV === 'production' ?
		'/Users/HiWin10/Desktop/vxeFormDesign/dist' : '/',
	// tweak internal webpack configuration.
	// see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
	// 如果你不需要使用eslint，把lintOnSave设为false即可
	// lintOnSave: false,.use('iview')
	chainWebpack: config => {
		config.module
			.rule('vue')
			.use('iview')
			.loader('iview-loader')
			.options({
				prefix: true
			});
		config.module
			.rule('raw')
			.test(/\.properties$/)
			.use('raw-loader')
			.loader('raw-loader')
			.end()

	},
	// 打包时不生成.map文件
	productionSourceMap: false,
	// 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
	// devServer: {
	//   proxy: 'localhost:3000'
	// }

}
