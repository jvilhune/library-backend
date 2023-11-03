
const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bbbookCount: Int!
    authorCount: Int!
    aaallBooks: [Book!]!
    aaallAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    findBook(author: String!): Book
    getBook(author: String!): Int!
    howmanyBooksbyWriter(author: String!): Int!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String
      genres: [String!]!
      ): Book
		
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token


  }
  type Subscription {
    bookAdded: Book!
  }
`
module.exports = typeDefs