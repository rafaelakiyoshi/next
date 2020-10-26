const next = require("next");
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const appRoutes = require("./config/routes");
const apiProxy = require("./config/apiProxy");

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });

const handle = appRoutes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();
  server.use(cors());
  server.use(cookieParser());
  server.use(compression());
  server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  server.use(bodyParser.json({ limit: "50mb" }));
  server.use("/api", apiProxy);
  server.get("*", handle);
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
