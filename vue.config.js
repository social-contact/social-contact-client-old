const { defineConfig } = require("@vue/cli-service");

// 自动引入element-plus
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
// icon
const Icons = require("unplugin-icons/webpack");
const IconsResolver = require("unplugin-icons/resolver");

const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: "electron/main.ts", // 修改主进程入口文件路径
      nodeIntegration: true, // 开启node支持
    },
  },
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin(),
      AutoImport({
        resolvers: [ElementPlusResolver(), IconsResolver({ prefix: "Icon" })],
      }),
      Components({
        resolvers: [
          IconsResolver({ enabledCollections: ["ep"] }),
          ElementPlusResolver(),
        ],
      }),
      Icons({ autoInstall: true }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});
