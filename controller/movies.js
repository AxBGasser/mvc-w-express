import { MovieModel } from '../models/databases/mongodb.js'

export class MoviesController {
  static async getAllController(req, res) {
    const movies = await MovieModel.getAll()
    res.json(movies)
  }

  static async getByIdController(req, res) {
    const { id } = req.params
    const movieById = await MovieModel.getById(id)

    if (movieById) return res.json(movieById)

    res.json({ error_message: 'Movie not found!' })
  }
  static async redirectMovies(res) {
    res.redirect('/movies')
  }
  static async getByGenreController(req, res) {
    const { genre } = req.params
    const movieByGenre = await MovieModel.getByGenre(genre)

    if (movieByGenre.length > 0) return res.json(movieByGenre)

    res.json({ error_message: `No Movies found with genre of ${genre}!` })
  }

  static async getByLangController(req, res) {
    const { lang } = req.params
    const movieByLang = await MovieModel.getByLang(lang)

    if (movieByLang.length > 0) return res.json(movieByLang)

    res.json({ error_message: `No Movies found with lang of ${lang}!` })
  }
}
