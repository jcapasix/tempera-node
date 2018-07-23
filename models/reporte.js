const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const Reporte = new Schema({
	cultivo: { type: Schema.Types.ObjectId, ref: 'Cultivo' },
	temperatura: { type: Schema.Types.ObjectId, ref: 'Temperatura' },
}, {timestamps: true});

Reporte.plugin(mongoosePaginate);

module.exports = mongoose.model('Reporte', Reporte);