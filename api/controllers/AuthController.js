/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  register: function(req, res) {
    if (req.method === 'POST') {
      var params = {
        email: req.body.email,
        password: req.body.password
      };

      User.create(params).exec(function(err, user) {
        if (err) {
          return res.negotiate(err);
        } else {
          return res.send(user);
        }
      });
    }
    if (req.method === 'GET') res.view('register');
  },

  login: function(req, res) {
    if (req.method === 'POST') {
      if (req.isAuthenticated()) {
        return res.send({
          loggedIn: true,
          user: req.user
        })
      }

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
    } else if (req.method === 'GET') {
      if (req.isAuthenticated()) {
        return res.redirect('/')
      }
      return res.view('login')
    }
  },

  logout: function(req, res) {
    req.logout();
    res.redirect('/login')
  }
};
