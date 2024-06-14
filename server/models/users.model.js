

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: { type: String, trim: true, required: true, unique: true,},
    password: {type: String, trim: true, required: true }, 
    username: {type: String, trim: true, required: true, unique: true,  maxLength: 36,}

},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports= User