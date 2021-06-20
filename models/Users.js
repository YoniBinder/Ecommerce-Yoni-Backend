// const dbConn = require("../config/mongo.config")
const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    id:String,
    email: {
        type: String,
        unique: true,
        required: 'Your email is required',
    },

    username: {
        type: String,
        unique: true,
        required:  'Your username is required',
    },

    password: {
        type: String,
        required: 'Your password is required',
    },

    role: {
        type: String,
    },

    activity: {
        type: String,
    },

    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    phoneNumber: {
        type: String,
    },

    country: {
        type: String,
    },

    profileImage: {
        type: String,
    },

    // resetPasswordToken: {
    //     type: String,
    // },

    // resetPasswordExpires: {
    //     type: Date,
    //     required: false
    // }
}, {timestamps: true});

UserSchema.statics.generateAccessToken = function (user){
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '2d' })
}
UserSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('users', UserSchema)