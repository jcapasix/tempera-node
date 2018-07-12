// 1. Load the User model
var Cultivo = require('../models/cultivo.js');

// 2. Get a paginated list of all People

exports.list = function(req, res) {
  Cultivo.find({}).exec(function (err, cultivos) {
    if (err) {
      res.json({"success":false, "error": err});
    }
    else {
      res.json({success:true, cultivos:cultivos});
    }
  });
};


exports.save = function(req, res) {

  console.log(req.body)

  var cultivo = new Cultivo(req.body.cultivo);

  cultivo.save(function(err) {
    if(err) {
      console.log(err);
      res.json({"success":false, "error": err});
    } else {
      console.log("Successfully created an cultivo.");
      res.json({"success":true, "message": "El cultivo se creo correctamente."});
    }
  });
};


exports.update = function(req, res) {
  console.log(req.body)


  req.body.cultivo.id = req.body.cultivo._id;
  delete req.body.cultivo._id;

  console.log(req.body)

  Cultivo.findByIdAndUpdate(req.body.cultivo.id, { $set: { nombre: req.body.cultivo.nombre, temperaturaMax: req.body.cultivo.temperaturaMax, temperaturaMin: req.body.cultivo.temperaturaMin, fechaInicial: req.body.cultivo.fechaInicial, fechaFinal: req.body.cultivo.fechaFinal }}, { new: true }, function (err, cultivo) {
    if (err) {
      console.log(err);
      res.json({"success":false, "error": "Error al actualizar el cultivo."});
    }
    res.json({"success":true, "message": "El cultivo se actualizó correctamente."});
  });
};


exports.delete = function(req, res) {
  Cultivo.remove({_id: req.body.id}, function(err) {
    if(err) {
      console.log(err);
      res.json({"success":false, "error": "Error al eliminar el cultivo."});
    }
    else {
      console.log("cultivo deleted!");
      res.json({"success":true, "message": "El cultivo se eliminó correctamente."});
    }
  });
};


exports.active = function(req, res) {
  console.log(req.body)
  Cultivo.updateMany({}, { active: false }, function() {
    Cultivo.findByIdAndUpdate(req.body.id, { $set: {active: true}}, { new: true }, function (err, cultivo) {
      if (err) {
        console.log(err);
        res.json({"success":false, "error": "Error al activar el cultivo."});
      }
      res.json({"success":true, "message": "El cultivo se activó correctamente."});
    });
  });
};

exports.cultivoActive = function(req, res) {
  console.log(req.body)
  Cultivo.findOne({active: true}, function (err, cultivo) {
      if (err) {
        console.log(err);
        res.json({"success":false, "error": "Error al activar el cultivo."});
      }
      res.json({"success":true, "cultivo": cultivo});
    });
};


