const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide name"],
        trim: "true",
    },
    email: {
        type: String,
        required: [true, "please provide email"],
        validator: [validator.isEmail, "please provide valid email"],
        unique: "true",
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "password must be at least 6 characters"],
        trim: true,
        select: false
    }
},{
    timestamps: true
});