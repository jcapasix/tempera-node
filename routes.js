// 1. Include config and modules
var config = require('./config');
var moment = require('moment');
const jwt = require('jsonwebtoken');
var Auth = require('./controllers/auth.js');
var Users = require('./controllers/users.js');
var User = require('./models/user.js');


// 2. Authentication Middleware
function ensureAuthenticated(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No  token provided'
    });
  }
};

// 3. Routes
module.exports = function (app) {
  // 4. Authentication Routes
  app.post('/api/auth/login', Auth.login);
  app.post('/api/auth/signup', Auth.signup);
  // 5. Application Routes
  app.post('/api/users', ensureAuthenticated, Users.list);
  app.get('/api/people/page/:page', ensureAuthenticated, Users.list);
  app.get('/api/people/:id', ensureAuthenticated, Users.show);
  app.post('/api/profile', ensureAuthenticated, Users.profile);

};