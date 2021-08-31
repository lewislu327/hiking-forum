const bcrypt = require('bcryptjs')
const { User, Favorite } = require('../models')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

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
      return res.redirect('/users/signin')
    } catch (error) {
      console.error(error)
    }
  },

  signInPage: (req, res) => {
    return res.render('signin')
  },

  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/mountains')
  },

  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/users/signin')
  },

  getUser: async (req, res) => {
    const user = await User.findByPk(req.params.id)
    const myId = req.user.id
    return res.render('user', { user: user.toJSON(), myId })
  },

  editUser: (req, res) => {
    return res.render('edit')
  },

  putUser: async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (!req.body.name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    }
    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, async (err, img) => {
        await user.update({
          name: req.body.name,
          image: file ? img.data.link : null,
        })
      })
      req.flash('success_messages', '已成功更新此筆紀錄')
      return res.redirect(`/users/${user.id}`)
    } else {
      user.update({ name: req.body.name })
      req.flash('success_messages', '已成功更新此筆紀錄')
      return res.redirect(`/users/${user.id}`)
    }
  },

  addFavorite: async (req, res) => {
    await Favorite.create({
      UserId: req.user.id,
      MountainId: req.params.mountainId,
    })
    return res.redirect('back')
  },

  removeFavorite: async (req, res) => {
    const favorite = await Favorite.findOne({
      where: {
        UserId: req.user.id,
        MountainId: req.params.mountainId,
      },
    })
    await favorite.destroy()
    return res.redirect('back')
  },
}

module.exports = userController
