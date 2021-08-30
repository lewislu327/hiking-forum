const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars')
const routes = require('./routes')

app.engine('hbs', handlebars({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(routes)
app.listen(port, () => {
  console.log('App is listening on http://localhost:3000')
})
