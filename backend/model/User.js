const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'fullName is required'],
        minlength: [5, 'fullName must be at least 5 characters'],
        maxlength: [50, 'fullName should be less than 50 characters'],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        index: true  // Optional indexing
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [8, 'password must be at least 8 characters'],
        select: false
    },
    profilePicture: {
        type: String,
        default: ""
    },
   
}, {
    timestamps: true
});

const User =model('user', userSchema);
module.exports = User;
