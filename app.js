const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars')
const routes = require('./routes')
const db = require('./models')
const flash = require('connect-flash')
const session = require('express-session')
const usePassport = require('./config/passport')

app.engine('hbs', handlebars({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})

usePassport(app)
app.use(routes)
app.listen(port, () => {
  console.log('App is listening on http://localhost:3000')
})
