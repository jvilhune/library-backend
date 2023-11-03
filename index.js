/*
library-backend
npm install uuid
npm install @apollo/server graphql
npm install mongoose dotenv
npm install mongoose-unique-validator
npm install jsonwebtoken
npm install express cors
npm install graphql-ws ws @graphql-tools/schema
npm install graphql-subscriptions
*/


const { ApolloServer } = require('@apollo/server')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { expressMiddleware } = require('@apollo/server/express4')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })




// setup is now within a function
const start = async () => {
  const app = express()

  app.use(express.static('dist'))

  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })
  
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      },
    }),
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()



const getBooks = (param1, param) => {
  var tblogs = authors.filter(p => p.author === param)
  var len = tblogs.length
  return tblogs.length
}



/* KYSELYT JA VASTAUKSET */

/*

query {
  allBooks(genre: "crime") {
    title
    author {
      name
      born
    }
  }
}

->

{
  "data": {
    "allBooks": [
      {
        "title": "Pimeyden tango",
        "author": {
          "name": "Reijo Mäki",
          "born": 1965
        }
      },
      {
        "title": "Pimeyden tango",
        "author": {
          "name": "Reijo Mäki",
          "born": 1965
        }
      },
      {
        "title": "Pimeyden tango",
        "author": {
          "name": "Reijo Mäki",
          "born": 1965
        }
      },
      {
        "title": "Lottovoittaja",
        "author": {
          "name": "William Holden",
          "born": 1952
        }
      }
    ]
  }
}

query {
  allBooks(author: "William Holden") {
    title
    author {
      name
      born
    }
  }
}

->

{
  "data": {
    "allBooks": [
      {
        "title": "Lottovoittaja",
        "author": {
          "name": "William Holden",
          "born": 1952
        }
      }
    ]
  }
}



mutation {
  createUser (
    username: "jvilhune"
    favoriteGenre: "crime"
  ) {
    username
    favoriteGenre
    id
  }
}

->

{
  "data": {
    "createUser": {
      "username": "jvilhune",
      "favoriteGenre": "crime",
      "id": "653e089e6bd28ce021ab8b9f"
    }
  }
}

mutation {
  login (
    username: "jvilhune"
    password: "secret"
  ) {
    value
  }
}

->


mutation {
  addBook(
    title: "Pimeyden tango",
    author: "Reijo Mäki",
    published: 1997,
    genres: ["crime"]
  ) {
    title,
    author
  }
}

->

{
  "data": {
    "addBook": {
      "title": "Pimeyden tango",
      "author": "Reijo Mäki"
    }
  }
}


mutation {
  addBook(
    title: "Viimeinen tango",
    author: "Reijo Mäki",
    published: 1998,
    genres: ["crime"]
  ) {
    title,
    author,
    published,
    genres
  }
}

->

{
  "data": {
    "addBook": {
      "title": "Viimeinen tango",
      "author": "Reijo Mäki",
      "published": 1998,
      "genres": [
        "crime"
      ]
    }
  }
}



mutation {
  editAuthor(name: "Joshua Kerievsky", setBornTo: 1958) {
    name
    born
  }
}

->

{
  "data": {
    "editAuthor": {
      "name": "Joshua Kerievsky",
      "born": 1958
    }
  }
}

query ExampleQuery {
  bbbookCount
  authorCount
}

->

{
  "data": {
    "bbbookCount": 7,
    "authorCount": 5
  }
}

query ExampleQuery {
  findBook(author: "Fyodor Dostoevsky") {
    title
  }
}

->

{
  "data": {
    "findBook": {
      "title": "Crime and punishment"
    }
  }
}



query {
  allAuthors {
    name
    bookCount
  }
}

->

{
  "data": {
    "allAuthors": [
      {
        "name": "Reijo Mäki",
        "bookCount": 3
      },
      {
        "name": "William Holden",
        "bookCount": 1
      }
    ]
  }
}

query ExampleQuery {
  howmanyBooksbyWriter(author: "Fyodor Dostoevsky")
}

->

{
  "data": {
    "howmanyBooksbyWriter": 2
  }
}


On aivan sama kayttaako aaallBooks vai allBooks

query ExampleQuery {
  aaallBooks { 
    title 
    author {
      name
      born
    }
    published 
    genres
  }
}

->

{
  "data": {
    "aaallBooks": [
      {
        "title": "Pimeyden tango",
        "author": {
          "name": "Reijo Mäki",
          "born": 1965
        },
        "published": 1997,
        "genres": [
          "crime"
        ]
      },
      {
        "title": "Pimeyden tango",
        "author": {
          "name": "Reijo Mäki",
          "born": 1965
        },
        "published": 1997,
        "genres": [
          "crime"
        ]
      },
      {
        "title": "Pimeyden tango",
        "author": {
          "name": "Reijo Mäki",
          "born": 1965
        },
        "published": 1997,
        "genres": [
          "crime"
        ]
      },
      {
        "title": "Lottovoittaja",
        "author": {
          "name": "William Holden",
          "born": 1952
        },
        "published": 1973,
        "genres": [
          "crime"
        ]
      }
    ]
  }
}



query ExampleQuery {
  allBooks { 
    title 
    author {
      name
      born
    }
    published 
    genres
  }
}

->

{
  "data": {
    "allBooks": [
      {
        "title": "Pimeyden tango",
        "author": {
          "name": "Reijo Mäki",
          "born": 1965
        },
        "published": 1997,
        "genres": [
          "crime"
        ]
      },
      {
        "title": "Pimeyden tango",
        "author": {
          "name": "Reijo Mäki",
          "born": 1965
        },
        "published": 1997,
        "genres": [
          "crime"
        ]
      },
      {
        "title": "Pimeyden tango",
        "author": {
          "name": "Reijo Mäki",
          "born": 1965
        },
        "published": 1997,
        "genres": [
          "crime"
        ]
      },
      {
        "title": "Lottovoittaja",
        "author": {
          "name": "William Holden",
          "born": 1952
        },
        "published": 1973,
        "genres": [
          "crime"
        ]
      }
    ]
  }
}



query {
  allBooks(author: "William Holden") {
    title
  }
}

->

{
  "data": {
    "allBooks": [
      {
        "title": "Lottovoittaja"
      }
    ]
  }
}


query ExampleQuery {
  aaallAuthors { 
    name
    id
    born
  }
}

->

{
  "data": {
    "aaallAuthors": [
      {
        "name": "Robert Martin",
        "id": "afa51ab0-344d-11e9-a414-719c6709cf3e",
        "born": 1952
      },
      {
        "name": "Martin Fowler",
        "id": "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        "born": 1963
      },
      {
        "name": "Fyodor Dostoevsky",
        "id": "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        "born": 1821
      },
      {
        "name": "Joshua Kerievsky",
        "id": "afa5b6f2-344d-11e9-a414-719c6709cf3e",
        "born": 1958
      },
      {
        "name": "Sandi Metz",
        "id": "afa5b6f3-344d-11e9-a414-719c6709cf3e",
        "born": null
      },
      {
        "name": "Reijo Mäki",
        "id": "35fdebd1-7352-11ee-886d-e99765f0e77c",
        "born": null
      }
    ]
  }
}


query {
  allBooks(genre: "crime") {
    title
    author {
      name
      born
    }
  }
}

->


{
  "data": {
    "allBooks": [
      {
        "title": "Pimeyden tango",
        "author": {
          "name": "Reijo Mäki",
          "born": 1965
        }
      },
      {
        "title": "Pimeyden tango",
        "author": {
          "name": "Reijo Mäki",
          "born": 1965
        }
      },
      {
        "title": "Pimeyden tango",
        "author": {
          "name": "Reijo Mäki",
          "born": 1965
        }
      },
      {
        "title": "Lottovoittaja",
        "author": {
          "name": "William Holden",
          "born": 1952
        }
      }
    ]
  }
}



query {
  allBooks(author: "Reijo Mäki", genre: "crime") {
    title
    author {
      name
      born
    }
  }
}

->

{
  "data": {
    "allBooks": [
      {
        "title": "Pimeyden tango",
        "author": {
          "name": "Reijo Mäki",
          "born": 1965
        }
      },
      {
        "title": "Pimeyden tango",
        "author": {
          "name": "Reijo Mäki",
          "born": 1965
        }
      },
      {
        "title": "Pimeyden tango",
        "author": {
          "name": "Reijo Mäki",
          "born": 1965
        }
      }
    ]
  }
}

mutation {
  addBook(
    title: "Lottovoittaja 13",
    author: "William Holden",
    published: 2007,
    genres: ["crime"]
  ) {
    title
    author {
      name
      born
    }
    published
    genres
  }
}

subscription Subscription {
  bookAdded {
    title
    author {
      name
      born
    }
    published
    genres
  }
}

*/









