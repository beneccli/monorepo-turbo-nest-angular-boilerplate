const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 30010;
const customRoutes = require('./custom-routes.js');

server.use(middlewares);

customRoutes.map((route) => {
  switch (route.method) {
    case 'get':
      server.get(route.path, (_, res) => { res.jsonp(route.json) })
      break;
    case 'post':
      server.post(route.path, (_, res) => { res.jsonp(route.json) })
      break;
    case 'put':
      server.put(route.path, (_, res) => { res.jsonp(route.json) })
      break;
    case 'patch':
      server.patch(route.path, (_, res) => { res.jsonp(route.json) })
      break;
    case 'delete':
      server.delete(route.path, (_, res) => { res.jsonp(route.json) })
      break;
  }
});

server.use(router);
server.use(jsonServer.rewriter({
  '/api/users': '/users'
}));

server.listen(port);
