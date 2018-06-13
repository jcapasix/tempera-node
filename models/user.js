const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const User = new Schema({
  username: {type:String, unique: true, lowercase: true, required: 'Username Invalid'},
  password: {type:String, select: true, required: 'Password Invalid'}  ,
  admin: Boolean
});

User.plugin(mongoosePaginate);

module.exports = mongoose.model('User', User);
