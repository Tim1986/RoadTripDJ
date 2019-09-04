const router = require('express').Router();

const db = require('../../models');

// router.post('/', (req, res) => {
//   const { email, password } = req.body;

//   db.Users.create({ email, password })
//     .then(user => res.json(user))
//     .catch(err => res.json(err));
// });

router.post('/', (req, res) => {
  // res.send("I am the /api/test/ route")
  // res.json(req.user);
  console.log("I am the /api/test route")
  console.log(req.body)
  res.end()
});

// router.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   db.Users.findOne({ where: { email } })
//     .then(user => {
//       if (!user || !user.comparePassword(password)) {
//         return res.status(401).send("Unauthorized");
//       }

//       res.json({
//         token: jwt.sign({ sub: user.id }, process.env.JWT_SECRET),
//         user
//       });
//     });
// });

module.exports = router;
