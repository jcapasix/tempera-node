// 1. Load the User model
var Reporte = require('../models/reporte.js');
var Cultivo = require('../models/cultivo.js');


// 2. Get a paginated list of all People

exports.list = function(req, res) {

  Cultivo.find({}).exec(function (err, cultivos) {
    if (err) {
      res.json({"success":false, "error": err});
    }
    else {

      Reporte.find({}).populate('cultivo').populate('temperatura').exec(function (err, reportes) {
        if (err) {
          res.json({"success":false, "error": err});
        }
        else {
            var alertas = 0
            var temperatura = 0
            var response = []

            for (i in cultivos){
              alertas = 0
              temperatura = 0
              for (j in reportes){
                //console.log(cultivos[index].id)
                if (cultivos[i].id == reportes[j].cultivo.id){
                  alertas = alertas + 1
                  temperatura = temperatura + reportes[j].temperatura.value
                  console.log("CAPA CAPA CAPA")
                }
              }
              if(alertas > 0){
                temperatura = (temperatura / alertas)
              }

              response.push({"cultivo":cultivos[i], "alertas":alertas, "temperatura":temperatura})

              
            }
            res.json({"success":true, "reportes":response});
          }
      });
    }
  });
};


exports.save = function(req, res) {

  console.log(req.body)
  var reporte = new Reporte(req.body.reporte);

  reporte.save(function(err) {
    if(err) {
      console.log(err);
      res.json({"success":false, "error": err});
    } else {
      console.log("Successfully created an reporte.");
      res.json({"success":true, "message": "El reporte se creo correctamente."});
    }
  });
};