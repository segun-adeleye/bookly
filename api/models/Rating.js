/**
 * Rating.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    rating : {
      type: 'integer',
      required: true,
      min: 1,
      max: 5
    },

    comment: {
      type: 'text'
    },

    user : {
      model: 'user',
    },

    book : {
      model: 'book'
    },
  }
};
