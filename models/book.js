
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	published: {
		type: Number,
		required: true
	},
	genres: [
		{type: String}
	],
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Author'
	}
})

bookSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Book', bookSchema)


/*
const mongoose = require('mongoose')

// you must install this library
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String}
  ]
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Book', schema)
*/

/*
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [{
    type: String
  }]
})

const Book = mongoose.model('Book', schema)

export default Book

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