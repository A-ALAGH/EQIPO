const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String },
  interests: { type: [String] },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);