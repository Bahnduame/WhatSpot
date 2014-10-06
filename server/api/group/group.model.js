'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String,
  yelp: {},
  vetos: Number,
  votes: Number,
});

module.exports = mongoose.model('Group', GroupSchema);