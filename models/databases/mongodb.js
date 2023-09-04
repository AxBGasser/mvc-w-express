import { MongoClient, ObjectId, ServerApiVersion, BSON } from 'mongodb'
import { capitalizeWord } from './../../utils/capitalizeWord.js'
import dotenv from 'dotenv'
dotenv.config()

let MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) console.log('MONGO_URI NOT FOUND!')

let client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function connect() {
  let MONGO_DB = process.env.MONGO_DB
  let MONGO_COLLECTION_NAME = process.env.MONGO_COLLECTION_NAME

  try {
    await client.connect()
    let database = client.db(MONGO_DB)
    return database.collection(MONGO_COLLECTION_NAME)
  } catch (error) {
    console.log('Error connecting to the database.')
    console.error(error)
    await client.close()
  }
}

export class MovieModel {
  static async getAll() {
    let db = await connect()
    return db.find({}).sort({ _id: -1 }).toArray()
  }

  static async getById(id) {
    let db = await connect()
    let _id = new ObjectId(id)
    let movie = db.findOne({ _id })
    return movie
  }

  static async getByGenre(genre) {
    let db = await connect()
    let movies = db.find({ genre }).toArray()
    // let movies = Movies.filter((movie) => movie.genre === genre)
    return movies
  }

  static async getByLang(lang) {
    let db = await connect()
    let language = capitalizeWord(lang)
    let movies = db.find({ language }).toArray()
    // let movies = Movies.filter((movie) => movie.language === langCapi)
    return movies
  }

  static async insertMovie(movie) {
    let db = await connect()
    // Validate movie with some library //
    let newMovie = await db.insertOne({ ...movie })

    return newMovie
  }

  static async updateMovie(id, movie) {
    let db = await connect()
    // Validate movie with some library //
    let _id = new ObjectId(id)
    let updatedMovie = await db.updateOne({ _id }, { $set: movie })
    return updatedMovie
  }

  static async deleteMovie(id) {
    let db = await connect()
    let _id = new ObjectId(id)
    let deletedMovie = await db.deleteOne({ _id })

    return deletedMovie
  }
}
