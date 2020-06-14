module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },

  chainWebpack: config => {
    config.module
      .rule("css")
      .test(/\.css$/)
      .oneOf("vue")
      .resourceQuery(/\?vue/)
      .use("px2rem")
      .loader("px2rem-loader")
      .options({
        remUnit: 75
      });
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-plugin-px2rem")({
            rootValue: 75, 
            exclude: /(node_module)/, 
            mediaQuery: false, 
            minPixelValue: 3 
          })
        ]
      }
    }
  },

  devServer: {
    proxy: {
      '/api/': {//业务类的接口请求地址，这里的api可以是后端的工程名
        changeOrigin: true,
        target: 'https://h5.okaoyan.com/'
      },
      '/aliyun/': {//业务类的接口请求地址，这里的api可以是后端的工程名
        changeOrigin: true,
        target: 'https://h5.okaoyan.com/'
      }
    }
  }
};
