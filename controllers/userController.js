const bcrypt = require('bcryptjs')
const { User, Favorite, Followship, Comment, Mountain } = require('../models')
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
        return res.redirect('/register')
      }

      const user = await User.findOne({ where: { email: req.body.email } })

      if (user) {
        req.flash('error_messages', '信箱重複！')
        return res.redirect('/register')
      }
      await User.create({
        name: req.body.name.trim(),
        email: req.body.email.trim(),
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null),
      })

      req.flash('success_messages', '成功註冊帳號！')
      return res.redirect('/signin')
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
    res.redirect('/signin')
  },

  getUser: async (req, res) => {
    let user = await User.findByPk(req.params.id, {
      include: [
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' },
        { model: Mountain, as: 'FavoritedMountains' },
        { model: Comment, include: [Mountain] },
      ],
    })

    return res.render('user', {
      user: user.toJSON(),
      myId: req.user.id,
      comments: user.Comments,
      FavoritedMountains: user.FavoritedMountains,
      Followers: user.Followers,
      Followings: user.Followings,
    })
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

  getTopUser: async (req, res) => {
    let users = await User.findAll({
      include: [{ model: User, as: 'Followers' }],
    })

    users = users.map((user) => ({
      ...user.dataValues,
      FollowerCount: user.Followers.length,
      isFollowed: req.user.Followings.map((d) => d.id).includes(user.id),
    }))
    // 依追蹤者人數排序清單
    users = users.sort((a, b) => b.FollowerCount - a.FollowerCount)
    return res.render('topUser', { users: users })
  },

  addFollowing: async (req, res) => {
    await Followship.create({
      followerId: req.user.id,
      followingId: req.params.userId,
    })
    return res.redirect('back')
  },

  removeFollowing: async (req, res) => {
    const followship = await Followship.findOne({
      where: {
        followerId: req.user.id,
        followingId: req.params.userId,
      },
    })
    await followship.destroy()
    return res.redirect('back')
  },
}

module.exports = userController
