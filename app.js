const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars')
const routes = require('./routes')
const db = require('./models')

app.engine('hbs', handlebars({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.use(routes)
app.listen(port, () => {
  console.log('App is listening on http://localhost:3000')
})
