/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      minLength: 6,
      required: true
    },

    // Association
    books: {
      collection: 'book',
      via: 'user'
    },

    ratings: {
      collection: 'rating',
      via: 'user'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password; // delete the password so it is not sent to the client
      return obj;
    }
  },
  // hash password before saving it to the database
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
        } else {
          user.password = hash;
          cb();
        }
      });
    });
  },
};
