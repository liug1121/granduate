module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
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

  // outputDir: 'position',
  outputDir: 'bigflowH5',
  devServer: {
    proxy: {
      "/bigflow/": {
        //业务类的接口请求地址，这里的api可以是后端的工程名
        changeOrigin: true,
        target: "http://localhost:8888/"
      },
      "/car/": {
        //业务类的接口请求地址，这里的api可以是后端的工程名
        changeOrigin: true,
        target: "http://47.115.157.89:8086/"
      }
    }
  }
};
