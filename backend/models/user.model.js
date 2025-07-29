import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        

    },
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const User = model('User', userSchema);
export default User;