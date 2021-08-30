const bcrypt = require('bcryptjs')
const { User } = require('../models')

const userController = {
  registerPage: (req, res) => {
    return res.render('register')
  },

  register: async (req, res) => {
    try {
      if (req.body.passwordCheck !== req.body.password) {
        req.flash('error_messages', '兩次密碼輸入不同！')
        return res.redirect('/users/register')
      }

      const user = await User.findOne({ where: { email: req.body.email } })

      if (user) {
        req.flash('error_messages', '信箱重複！')
        return res.redirect('/users/register')
      }

      await User.create({
        name: req.body.name.trim(),
        email: req.body.email.trim(),
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null),
      })

      req.flash('success_messages', '成功註冊帳號！')
      return res.redirect('users/signin')
    } catch (error) {
      console.error(error)
    }
  },
}

module.exports = userController
