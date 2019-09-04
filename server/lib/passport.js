const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const User = require('../models');
const SECRET = process.env.JWT_SECRET || 'secret';

var JWT_STRATEGY_OPTS = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};

passport.use(
  new JwtStrategy(JWT_STRATEGY_OPTS, function (jwtPayload, done) {
    User.findOne({ _id: jwtPayload.sub })
      .then(user => done(null, user || false))
      .catch(err => done(err, false));
  })
);

const JWTVerifier = passport.authenticate('jwt', { session: false });

module.exports = {
  passport,
  JWTVerifier,
  SECRET
};
