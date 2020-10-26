const nextRoutes = require("next-routes");
const APP_ROUTES = require("./app.routes");
const routes = (module.exports = nextRoutes());
APP_ROUTES.forEach(route => routes.add(route));
