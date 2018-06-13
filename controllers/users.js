// 1. Load the User model
var User = require('../models/user.js');

// 2. Get a paginated list of all People
exports.list = function(req, res){
  var query = {};
  var page = req.params.page || 1;
  var options = {
    select: 'first last',
    page: page
  };
  User.paginate(query, options).then(function(result) {
    res.json(result);
  });
};

// 2. Get an individual User's public information
exports.show = function(req, res){
  User.findById(req.params.id)
    .select('first last')
    .exec(function(err, doc){
      if(err || doc === null){
        res.status(404).json({error: 'UserNotFound'});
      } else {
        res.json(doc);
      }
  });
};

// 3. Get an individual User's private profile information
exports.profile = function(req, res){
  User.findById(req.id)
    .select('email first last')
    .exec(function(err, doc){
      if(err || doc === null){
        res.status(404).json({error: 'UserNotFound'});
      } else {
        res.json(doc);
      }
    });
};