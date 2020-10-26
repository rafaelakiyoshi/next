const express = require("express");
const unfetch = require("isomorphic-unfetch");
const router = express.Router();
const { enviroments: { API_URL }} = require("./index")
const API = API_URL || "http://localhost:8080/api";

router.all("/", (req, res) => {
  unfetch(`${API}${req.body.endpoint}`, {
    method: req.method,
    headers: req.headers,
    body: JSON.stringify(req.body),
  })
    .then((r) => r.json())
    .then((data) => res.json(data))
    .catch((e) => res.json({ e }));
});
module.exports = router;
