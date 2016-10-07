/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  profile: function(req, res) {
    res.send({
      user: req.user,
      session: req.session
    });
  }
};
