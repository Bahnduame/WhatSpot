'use strict';

var _ = require('lodash');
var Group = require('./group.model');
var yelp = require("yelp").createClient({
        consumer_key: "tWXZ06XhpgOgzdFCXjwuXQ", 
        consumer_secret: "WQUWDghej2WlzvZD-_PgOUAjSLI",
        token: "TB0HMwCq94InphtgQKfabp2MVspS_ysX",
        token_secret: "tv3BlSjz88DejQ2l9obovuy4MIM"
      });


exports.getYelpResults = function(req, res){
  var search = req.body.search;
  var location = req.body.location;
  
  var restObj = {};
  var rest = [];
  var resultsArr = [];
  var bizArr = [];

  yelp.search({term: search, location: location}, function(error, data) {

    bizArr = data.businesses;
    console.log(bizArr);

    for (var i=0; i<bizArr.length; i++){
      var yelpObj = {};
      yelpObj.id = bizArr[i].id;
      yelpObj.name = bizArr[i].name;
      yelpObj.rating = bizArr[i].rating;
      yelpObj.url = bizArr[i].url;
      yelpObj.mobile_url = bizArr[i].mobile_url;
      resultsArr.push(yelpObj);
    }

    return res.json(resultsArr);
  });
}



// Get list of groups
exports.index = function(req, res) {
  Group.find(function (err, groups) {
    if(err) { return handleError(res, err); }
    return res.json(200, groups);
  });
};

// Get a single group
exports.show = function(req, res) {
  Group.findById(req.params.id, function (err, group) {
    if(err) { return handleError(res, err); }
    if(!group) { return res.send(404); }
    return res.json(group);
  });
};

// Creates a new group in the DB.
exports.create = function(req, res) {
  Group.create(req.body, function(err, group) {
    if(err) { return handleError(res, err); }
    return res.json(201, group);
  });
};

// Updates an existing group in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Group.findById(req.params.id, function (err, group) {
    if (err) { return handleError(res, err); }
    if(!group) { return res.send(404); }
    var updated = _.merge(group, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, group);
    });
  });
};

// Deletes a group from the DB.
exports.destroy = function(req, res) {
  Group.findById(req.params.id, function (err, group) {
    if(err) { return handleError(res, err); }
    if(!group) { return res.send(404); }
    group.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}