import { MongoError } from 'mongodb'
import { MovieModel } from '../models/databases/mongodb.js'
import {
  DELETE_OK,
  ERROR_DELETING_MOVIE,
  INSERT_OK,
  MOVIE_NOT_FOUND,
  NO_CHANGES_FOUND,
  NO_MOVIES_FOUND,
  NULL,
  UPDATE_OK,
  ZERO,
} from '../utils/constants.js'

export class MoviesController {
  static async getAllController(req, res) {
    let movies = await MovieModel.getAll()
    res.json(movies)
  }

  static async getByIdController(req, res) {
    try {
      let { id } = req.params
      let movie = await MovieModel.getById(id)

      if (movie === NULL) throw new Error(MOVIE_NOT_FOUND)

      res.status(200).json(movie)
    } catch (error) {
      let { message } = error
      res.status(400).json({ error_message: message })
    }
  }
  static async redirectMovies(res) {
    res.redirect('/movies')
  }

  static async getByGenreController(req, res) {
    try {
      let { genre } = req.params
      let movieByGenre = await MovieModel.getByGenre(genre)

      if (movieByGenre.length === ZERO) throw new Error(NO_MOVIES_FOUND)
      return res.status(200).json(movieByGenre)
    } catch (error) {
      let { message } = error
      res.status(400).json({ error_message: message })
    }
  }

  static async getByLangController(req, res) {
    try {
      let { lang } = req.params
      let movieByLang = await MovieModel.getByLang(lang)

      if (movieByLang.length === ZERO) throw new Error(NO_MOVIES_FOUND)

      return res.status(200).json(movieByLang)
    } catch (error) {
      let { message } = error
      res.status(400).json({ error_message: message })
    }
  }

  static async insertMovie(req, res) {
    try {
      let { body } = req

      let newMovie = await MovieModel.insertMovie(body)

      if (newMovie.acknowledged !== true) throw new Error(ERROR_ON_INSERT)

      res.status(201).json({ message: INSERT_OK })
    } catch (error) {
      let { message } = error
      res.status(400).json({ error_message: message })
    }
  }

  static async updateMovie(req, res) {
    try {
      let { id } = req.params
      let { body } = req
      let updatedMovie = await MovieModel.updateMovie(id, body)

      if (updatedMovie.matchedCount === 0) throw new Error(MOVIE_NOT_FOUND)
      if (updatedMovie.modifiedCount === 0) throw new Error(NO_CHANGES_FOUND)

      res.status(200).json({ message: UPDATE_OK })
    } catch (error) {
      let { message } = error

      res.status(400).json({ error_message: message })
    }
  }

  static async deleteMovie(req, res) {
    try {
      let { id } = req.params
      let deletedMovie = await MovieModel.deleteMovie(id)

      if (deletedMovie.acknowledged === false)
        throw new Error(ERROR_DELETING_MOVIE)
      if (deletedMovie.deletedCount === 0) throw new Error(ERROR_DELETING_MOVIE)

      res.status(200).json({ message: DELETE_OK })
    } catch (error) {
      let { message } = error
      res.status(400).json({ error_message: message })
    }
  }
}
