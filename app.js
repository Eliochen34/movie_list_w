const express = require('express')
const app = express()
const port = 3000
const movieList = require('./movies.json')

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {movies: movieList.results})
})

app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.find(item => item.id.toString() === req.params.movie_id)
  res.render('show', {movie: movie})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter(item => item.title.toLocaleLowerCase().includes(req.query.keyword) )
  res.render('index', {movies: movies, keyword: keyword})
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})