if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars')
const routes = require('./routes')
const db = require('./models')
const flash = require('connect-flash')
const session = require('express-session')
const usePassport = require('./config/passport')
const methodOverride = require('method-override')

app.engine(
  'hbs',
  handlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require('./config/handlebars-helpers'),
  })
)
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use('/upload', express.static(__dirname + '/upload'))
app.use(flash())
usePassport(app)
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user
  next()
})
app.use(methodOverride('_method'))
app.use(routes)
app.listen(port, () => {
  console.log('App is listening on http://localhost:3000')
})
