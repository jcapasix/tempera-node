const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const Cultivo = new Schema({
  nombre: {type:String, required: 'Name Invalid'},
  temperaturaMax: {type:Number, required: 'Temperatura Invalid'},
  temperaturaMin: {type:Number, required: 'Temperatura Invalid'},
  fechaInicial: {type:Date, required: 'Date Invalid'},
  fechaFinal: {type:Date, required: 'Date Invalid'},
  active: {type:Boolean, default: false },
});

Cultivo.plugin(mongoosePaginate);

module.exports = mongoose.model('Cultivo', Cultivo);