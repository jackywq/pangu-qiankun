const { name } = require("./package");

module.exports = {
  webpack: (config) => {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = "umd";
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
    config.output.globalObject = "window";

    // 配置可以省略的文件后缀
    config.resolve.extensions = [".tsx", ".ts", ".js", ".jsx", ".json"];

    return config;
  },
  devServer: (_) => {
    const config = _;
    config.headers = {
      "Access-Control-Allow-Origin": "*",
    };
    config.historyApiFallback = true;
    config.hot = false; // 关闭热更新以避免Websocket连接问题(可选)
    config.watchContentBase = false;
    config.liveReload = false;
    return config;
  },
};
