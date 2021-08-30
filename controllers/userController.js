const bcrypt = require('bcryptjs')
const { User } = require('../models')

const userController = {
  registerPage: (req, res) => {
    return res.render('register')
  },

  register: (req, res) => {
    User.create({
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      password: bcrypt.hashSync(req.body.password.trim(), bcrypt.genSaltSync(10), null),
    }).then((user) => {
      return res.redirect('/signin')
    })
  },
}

module.exports = userController
