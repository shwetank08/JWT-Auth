const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const {EXPIRY, SECRET} = process.env; 
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

userSchema.pre('save',async function(next){
    if(!this.isModified(password)){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods = {
    getJWToken: function(){
        return JWT.sign({
            _id: this.id,
            email: this.email
        },SECRET,
        {
            expiresIn: EXPIRY
        })
    }
}

module.exports = mongoose.model("User", userSchema);