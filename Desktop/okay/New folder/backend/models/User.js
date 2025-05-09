const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     name: String,
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Make name required
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


module.exports = mongoose.model('User', UserSchema);
