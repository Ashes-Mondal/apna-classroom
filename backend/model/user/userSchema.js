const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema(
    {
        uuid: {
            type: String,
            require: true,
            unique: true
        },
        name: {
            type: String,
        },
        mobile: {
            type: String,
            validate: {
                validator: (v)=>/\d{10}/.test(v) ,
                message: props => `${props.value} is not a valid phone number!`
            },
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        registered_using: {
            type: String,
            default: "Aapna classroom"
        },
        failedLoginAttempts: {
            type: Number,
            default: 0
        },
        emailVerified: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            default: "Active"
        },
        disableReason: {
            type: String,
            default: ""
        },
        role: {
            type: String,
            default: "student"
        },
        signedUpMethod: {
            type: String,
            default: ""
        },
        emailVerificationCode: {
            type: String,
            default: ""
        },
        gender: {
            type: String,
            default: ""
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Users', UsersSchema);