const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const Temperatura = new Schema({
  value: {type:String, required: 'Temperatura Invalid'},
});

Temperatura.plugin(mongoosePaginate);

module.exports = mongoose.model('Temperatura', Temperatura);