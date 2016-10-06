/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
  register: function(req, res) {
    var params = {
      email: req.body.email,
      password: req.body.password
    };
    User.create(params).exec(function(err, user) {
      if (err) {
        res.serverError(err);
      } else {
        res.send(user);
      }
    });
  },

  login: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if (err || !user) {
        return res.send({
          message: info.message,
          user: user
        });
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        return res.send({
          message: info.message,
          user: user
        });
      });
    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    res.redirect('/login')
  }
};

