const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
          },
          message: '{VALUE} is not a valid email address!'
        }
      },
    password: {
        type: String,
        required: true,
        unique:true,
        minLength:[8,"password must be 8 character long"]
    },
    cleanPwd:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;