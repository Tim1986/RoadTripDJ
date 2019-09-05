const router = require("express").Router();
const validateLoginInput = require("../../models/login");
const User = require("../../models/user");
const validateRegisterInput = require("../../models/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWTVerifier } = require('../../lib/passport');
const secretOrKey = require("../../lib/passport").SECRET;

router.post("/register", (req, res) => {
  //Form validator
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => res.json(user)).catch((err) => console.log(err));
        });
      });
    }
  });
});

//Login
router.post("/login", (req, res) => {
  //Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //User matched
        //Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Token
        jwt.sign(
          payload,
          secretOrKey,
          {
            expiresIn: 31556926 // 1 year sec
          },
          (err, token) => {
            if (err) {
              console.log(err);
            }

            res.json({
              success: true,
              token,
              user
            });
          }
        );
      } else {
        return res.status(400).json({ passwordincorrect: "Password is incorrect" });
      }
    });
  });
});

router.get("/me", JWTVerifier, (req, res) => {
  res.json(req.user);
});

router.get("/logout", (req, res) => {
  req.logout();
  // res.redirect("/");
  // window.location.href = "/";
});

module.exports = router;
