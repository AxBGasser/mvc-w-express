import { Router } from 'express'
import { MoviesController } from './../controller/movies.js'
export const moviesRouter = Router()

moviesRouter.get('/', MoviesController.getAllController)
moviesRouter.get('/:id', MoviesController.getByIdController)
moviesRouter.get('/genre/:genre', MoviesController.getByGenreController)
moviesRouter.get('/lang/:lang', MoviesController.getByLangController)
moviesRouter.post('/new/', MoviesController.insertMovie)
moviesRouter.put('/update/:id', MoviesController.updateMovie)
moviesRouter.delete('/delete/:id', MoviesController.deleteMovie)
