const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.compilerOptions = {
          ...options.compilerOptions,
          isCustomElement: (tag) => ['b-navbar', 'b-navbar-toggle', 'b-collapse','b-navbar-brand', 'b-button', 'router-link', 'b-navbar-nav'].includes(tag),
        };
        return options;
      });
  },
})
