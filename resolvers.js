const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')



const resolvers = {
  Query: {
    bbbookCount: async () => {
      const res = await Book.find()
      return res.length
    },
    authorCount: async () => {
      const res = await Author.find()
      return res.length
    },
    aaallBooks: async (root, args) => {
      //let res = await Book.find()

      let res = Book.find({}).populate('author')

      if (args.author) {
        res = res.filter(book => book.author.name === args.author)
      }

      if (args.genre) {
        res = res.filter(book => book.genres.includes(args.genre))
      }
      console.log('res', res)
      return res
    },
    //aaallAuthors: () => authors,
    //findBook: (root, args) => books.find(p => p.author === args.author),

    aaallAuthors: async () => await Author.find(),
    me: (root, args, context) => {
      return context.currentUser
    },


    howmanyBooksbyWriter: (root, args) => {
      var tbooks = books.filter(p => p.author === args.author)
      var len = tbooks.length
      return len
    },
    allBooks: async (root, args) => {
      let res = await Book.find()

      if (args.author) {
        res = res.filter(book => book.author.name === args.author)
      }

      if (args.genre) {
        res = res.filter(book => book.genres.includes(args.genre))
      }

      return res
    },
    /*
    allBooks: async (root, args) => {
      //let res = await Book.find()

      let res = await Book.find({}).populate('author')

      if (args.author) {
        res = res.filter(book => book.author.name === args.author)
      }

      if (args.genre) {
        res = res.filter(book => book.genres.includes(args.genre))
      }

      return res
    },
    */

    /*
    allAuthors: () => {
      return authors.map(a => {
	return {
          bookCount: books.filter(b => b.author === a.name).length,
          ...a
        }
      })
    },
    */

    allAuthors: async () => await Author.find(),
    me: (root, args, context) => {
      return context.currentUser
    }

  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id })
      return books.length
    }
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author)
      return {
        id: author.id,
        name: author.name,
        born: author.born
      }
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let author = await Author.findOne({ name: args.author })

      console.log('author', author)

      if (!author) {
        author = await new Author({ name: args.author }).save()
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author,
        genres: args.genres
      })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
		
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let author = await Author.findOne({ name: args.name })

      if (author) {
        author.born = args.setBornTo
        await author.save()
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
 },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }

}

module.exports = resolvers
