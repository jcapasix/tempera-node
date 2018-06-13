// 1. Load the Person model
var User = require('../models/user.js');
var config = require('../config');
const jwt = require('jsonwebtoken');


exports.login = function(req, res){
  
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if(err) throw err;

    if (!user) {
      res.json({success: false, message:'Autenticación Fallida. El usuario no existe.'});
    }

    else if (user){
      console.log(user)
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Autenticación Fallida. Contraseña incorrecta.'});
      } else {
        const token = jwt.sign({user}, config.TOKEN_SECRET);
        const newUser = {"_id":user._id, "username":user.username, "token": token}

        res.json({
          success: true,
          user: newUser
        });
      }
    }
  });
};

exports.signup = function(req, res){

  User.findOne({'username': req.body.username}, function(err, user){
    if(err){

    }
    if(user){
      return res.status(200).send({
          success: false,
          message: 'El Usuario ya se encuentra registrado'
          });
    }
    else{
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        admin: req.body.admin
      });
        user.save(function (err) {
            console.log("user save")

            if(err){
              return res.status(404).send({
                success: false,
                message: 'Error al crear el Usuario'
              });
            };

            return res.status(201).send({
              success: true,
              message: 'Usuario creado correctamente'
            });
        });
    }

  });

};