module.exports = {
  configureWebpack: {
    devtool: 'cheap-module-source-map'
  },
  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.ts',
      title: 'Popup'
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: './src/js/background.js'
        }
      }
    }
  }
}
