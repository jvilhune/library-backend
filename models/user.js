
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3
	},
	favoriteGenre: {
		type: String,
		required: true
	}
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)





/*

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person'
    }
  ],
})

module.exports = mongoose.model('User', schema)
*/


/*

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favoriteGenre: {
    type: String
  }
})

const User = mongoose.model('User', schema)

export default User

*/