// 1. Load the User model
var Temperatura = require('../models/temperatura.js');
var Cultivo = require('../models/cultivo.js');

exports.save = function(req, res) {
  console.log(req.body)

  var temperatura = new Temperatura(req.body.temperatura);

  temperatura.save(function(err) {
    if(err) {
      console.log(err);
      res.json({"success":false, "error": err});
    } else {
      console.log("Successfully created an temperatura.");
      res.json({"success":true, "message": "La temperatura se creo correctamente."});
    }
  });
};

exports.list = function(req, res) {
  Temperatura.find({}).exec(function (err, temperaturas) {
    if (err) {
      res.json({"success":false, "error": err});
    }
    else {
      res.json({success:true, temperaturas:temperaturas});
    }
  });
};

exports.temp = function(req, res) {

  //var cultivo = {}

  Cultivo.findOne({active: true}, function (err, cultivo) {
      if (err) {
        console.log(err);
      }
      Temperatura.findOne({}, {}, { sort: {'createdAt' : -1 } }, function(err, post) {
        console.log( post );
         if (err) {
          res.json({successs:false, "error": err});
        }
        else {
          res.json({success:true, temperatura:post, cultivo:cultivo});
        }
      });

      //cultivo = cultivo
  });


  

};