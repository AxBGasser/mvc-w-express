import express, { urlencoded } from 'express'
import helmet from 'helmet'
import nocache from 'nocache'
import compression from 'compression'
import { moviesRouter } from './routes/movies.js'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT

const app = express()
app.use(compression())
app.use(nocache())
app.use(helmet({
  xDownloadOptions: false,
  xPoweredBy: false,
  strictTransportSecurity: {
    maxAge: 63072000,
    preload: true,
  },

}))
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
