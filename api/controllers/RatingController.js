/**
 * RatingController
 *
 * @description :: Server-side logic for managing Ratings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	rate: function(req, res) {
    if (req.isAuthenticated()) {
      var params = {
        rating: req.body.rating,
        comment: req.body.comment,
        book: req.body.book,
        user: req.user.id
      };

      Rating.create(params).exec(function(err, rating) {
        if (err) {
          return res.negotiate(err);
        } else {
          return res.send(rating);
        }
      });
    } else {
      return res.negotiate({
        success: false,
        status: 400,
        message: 'You need to sign in'
      });
    }
  }
};
