const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: ('http://localhost:9898'),
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
  
  app.use(
    '/photo',
    createProxyMiddleware({
      target: ('https://medzard.dev.itrev.ru/api/jr/download'),
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
};
