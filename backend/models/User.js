const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  nonce: { type: String, required: true }, // Change to String
});

const User = mongoose.model('User', userSchema);
module.exports = User;
