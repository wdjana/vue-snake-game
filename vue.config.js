const path = require('path');
const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 4200,
      allowedHosts: 'all'
  },
  chainWebpack: config => {
      config.resolve.alias
          .set('snake', path.resolve(__dirname, 'src/vue-snake-game'));

      // console.log({ config });
      config.entryPoints.delete('app');
      config.entry('app').add('./src/vue-snake-game/app.js').end().end();
  },
})
