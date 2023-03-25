const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = {
  target: "https://test.evundile.com.mx",
  secure: true,
  changeOrigin: true,
  headers: {
    ws_key: "9QMR8FP6SFCICN2RN5U4ZNM16M5HQ4AR",
    "output-format": "JSON",
  },
};
module.exports = function (app) {
  app.use("/api", createProxyMiddleware(proxy));
};
