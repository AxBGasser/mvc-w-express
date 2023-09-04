import express, { urlencoded } from 'express'
import { moviesRouter } from './routes/movies.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT
app.use(express.json())

app.get('/', (req, res) => {
  res.redirect('/movies')
})

app.use('/movies', moviesRouter)

app.listen(port, () => {
  console.log()
  console.log(`Running on http://localhost:${port}`)
  console.log()
})
