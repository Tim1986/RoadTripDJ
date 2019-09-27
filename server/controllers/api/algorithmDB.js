const router = require("express").Router(),
  axios = require("axios");

const State = require("../../models/state"),
  WikiCity = require("../../models/wikiCity"),
  Artist = require("../../models/artist");

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
  // seed();
  // res.end()
  State.find({})
    .populate({
      path: "wikiCities",
      populate: { path: "artists" }
    })
    .exec((err, states) => {
      if (err) console.log(err);
      res.send(states);
    });
});

module.exports = router;
