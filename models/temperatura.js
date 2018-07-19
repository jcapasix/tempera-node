const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const Temperatura = new Schema({
  value: {type:Number, required: 'Temperatura Invalid'},
}, {timestamps: true});

Temperatura.plugin(mongoosePaginate);

module.exports = mongoose.model('Temperatura', Temperatura);