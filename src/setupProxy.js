const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = (app) => { //module.exports = function (app){}
    app.use(
        createProxyMiddleware("/api", {
            target: "http://localhost:8080/myform",
            changeOrigin: true
        })
    );
    /*
    app.use(
        createProxyMiddleware("/api", {
            target: "http://localhost:5000",
            changeOrigin: true
        })
    );
    */
    /* 이것과 같다.
    module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
  */
};