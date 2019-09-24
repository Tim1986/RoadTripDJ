const router = require("express").Router(),
  axios = require("axios");

const seed = require("../../lib/seed");

//=================================================
// Functions
//=================================================

const func1 = () => {};

const func2 = () => {};

//=================================================
// Routes
//=================================================

router.get("/seed", (req, res) => {
  seed();
  res.end();
});

module.exports = router;
