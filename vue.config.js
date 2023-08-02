const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 80,
    proxy: {
      '/api': {
        target: 'http://113.108.140.173:40000',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        // 默认情况下 sass 选项会同时对 sass 和 scss 语法同时生效
        // scss 语法在内部也是由 sass-loader 处理的
        // 但是在配置 prependData 选项的时候
        // scss 语法会要求语句结尾必须有分号，sass 则要求必须没有分号
        // 在这种情况下，我们可以使用 scss 选项对 scss 语法进行单独配置
        additionalData: '@import "~@/styles/variables.scss";'
      }
    }
  }
})
