/**
 * BookController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var _ = require('lodash');

module.exports = {
  index: function(req, res) {
    return res.view('book/index')
  },

  getAllBooks: function(req, res) {
    Book.find()
      .populate('user')
      .populate('ratings')
      .exec(function(err, books) {
        if (err) {
          res.serverError(err);
        } else {
          var ratings = _.flattenDeep(_.pluck(books, 'ratings'));
          var user_ids = _.pluck(ratings, 'user');

          User.find({ id: user_ids }).exec(function(err, users) {
            if (err) {
              res.serverError(err);
            } else {
              res.send({
                books: books,
                users: _.indexBy(users, 'id')
              });
            }
          })
        }
      });
  },

  addBook: function(req, res) {
    if (req.isAuthenticated()) {
      var book_params = {
        title: req.body.title,
        author: req.body.author,
        user: req.user.id
      };

      Book.create(book_params).exec(function(err, newBook) {
        if (err) {
          return res.negotiate(err);
        } else {
          var rating_params = {
            rating: req.body.rating,
            comment: req.body.comment,
            book: newBook.id,
            user: req.user.id
          };

          Rating.create(rating_params).exec(function(err, rating) {
            if (err) {
              return res.negotiate(err);
            } else {
              Book.findOne(newBook.id)
                .populate('user')
                .populate('ratings')
                .exec(function(err, book) {
                  console.log(book)
                  return res.send({
                    book: book
                  });
                });
            }
          });
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
