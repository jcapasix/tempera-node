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
      const error = {title: "Autenticación Fallida", detail:"El usuario no existe."}
      res.json({success: false, error:error});
    }

    else if (user){
      console.log(user)
      if (user.password != req.body.password) {
        const error = {title: "Autenticación Fallida", detail:"Contraseña incorrecta."}
        res.json({success: false, error:error});
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
      const error = {title: "Registro Fallido", detail:"El Usuario ya se encuentra registrado."}
      return res.status(200).send({
          success: false,
          error: error
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
              const error = {title: "Registro Fallido", detail:"Error al crear el Usuario."}
              return res.status(404).send({
                success: false,
                error: error
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