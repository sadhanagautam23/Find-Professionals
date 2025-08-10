import {Schema, model} from 'mongoose';
import ExperienceSchema from './experience.model.js'

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
    },

   profileCompleted: {
  type: Boolean,
  default: false,
},
   category: {
    type: String,
    enum: [
      "Developer", "Designer", "Marketer", "Writer", 
      "Finance", "Engineer"
    ],
    default: undefined
  },

  subcategory: String,

  skills: {
    type: [String],
    default: undefined
  },

  about: {
    type: String,
    default: undefined
  },

  experiences: [ExperienceSchema]


});



const User = model('User', userSchema);
export default User;