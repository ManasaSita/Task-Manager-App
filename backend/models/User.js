const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3 },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ 
  },
  password: { type: String, required: true, minlength: 6 },
});

module.exports = mongoose.model("User", userSchema);
