const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/graphql', createProxyMiddleware({
    target: 'https://leetcode.com',
    changeOrigin: true,
    pathRewrite: {
      '^/graphql': '/graphql'
    }
  }));
};