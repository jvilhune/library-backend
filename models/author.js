
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')



const authorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	born: Number,
	books: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book'
		}
	]
})



authorSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Author', authorSchema)

/*
const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Author', schema)
*/

/*

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  }
})


const Author = mongoose.model('Author', schema)

export default Author 


*/

/*

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  phone: {
    type: String,
    minlength: 5
  },
  street: {
    type: String,
    required: true,
    minlength: 5
  },
  city: {
    type: String,
    required: true,
    minlength: 3
  },
})

module.exports = mongoose.model('Person', schema)

*/