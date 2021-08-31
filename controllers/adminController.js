const { Mountain, User, Altitude } = require('../models')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminController = {
  getUsers: async (req, res) => {
    const users = await User.findAll({ raw: true })
    return res.render('admin/mountains', { users })
  },

  toggleAdmin: async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (user.isAdmin) {
      await user.update({ isAdmin: false })
      req.flash('success_messages', 'success: admin change to user')
      return res.redirect('/admin/users')
    } else {
      await user.update({ isAdmin: true })
      req.flash('success_messages', 'success: user change to admin')
      return res.redirect('/admin/users')
    }
  },
  getMountains: async (req, res) => {
    try {
      const mountains = await Mountain.findAll({
        raw: true,
        nest: true,
        include: [Altitude],
      })
      return res.render('admin/mountains', { mountains })
    } catch (error) {
      console.error(error)
    }
  },

  createMountain: async (req, res) => {
    const altitudes = await Altitude.findAll({ raw: true, nest: true })
    console.log(altitudes)
    return res.render('admin/create', { altitudes })
  },

  postMountain: async (req, res) => {
    try {
      if (!req.body.name) {
        req.flash('error_messages', "name didn't exist")
        return res.redirect('back')
      }
      const { file } = req
      if (file) {
        imgur.setClientID(IMGUR_CLIENT_ID)
        imgur.upload(file.path, async (err, img) => {
          await Mountain.create({
            name: req.body.name,
            difficulty: req.body.difficulty,
            address: req.body.address,
            height: req.body.height,
            description: req.body.description,
            image: file ? img.data.link : null,
            AltitudeId: req.body.altitudeId,
          })
        })
      } else {
        await Mountain.create({
          name: req.body.name,
          difficulty: req.body.difficulty,
          address: req.body.address,
          height: req.body.height,
          description: req.body.description,
          image: null,
          AltitudeId: req.body.altitudeId,
        })
      }

      req.flash('success_messages', '已成功新增此筆紀錄')
      return res.redirect('/admin/mountains')
    } catch (error) {
      console.error(error)
    }
  },

  getMountain: async (req, res) => {
    const mountain = await Mountain.findByPk(req.params.id, {
      include: [Altitude],
    })
    console.log(mountain)
    return res.render('admin/mountain', { mountain: mountain.toJSON() })
  },

  editMountain: async (req, res) => {
    const mountain = await Mountain.findByPk(req.params.id)
    const altitudes = await Altitude.findAll({ raw: true, nest: true })
    return res.render('admin/create', { mountain: mountain.toJSON(), altitudes })
  },

  putMountain: async (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', '未輸入名稱')
      return res.redirect('back')
    }
    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, async (err, img) => {
        const mountain = await Mountain.findByPk(req.params.id)
        await mountain.update({
          name: req.body.name,
          difficulty: req.body.difficulty,
          address: req.body.address,
          height: req.body.height,
          description: req.body.description,
          image: file ? img.data.link : mountain.image,
          AltitudeId: req.body.altitudeId,
        })
      })
    } else {
      const mountain = await Mountain.findByPk(req.params.id)
      await mountain.update({
        name: req.body.name,
        difficulty: req.body.difficulty,
        address: req.body.address,
        height: req.body.height,
        description: req.body.description,
        image: mountain.image,
        AltitudeId: req.body.altitudeId,
      })
    }

    req.flash('success_messages', '已成功更新此筆紀錄')
    res.redirect('/admin/mountains')
  },

  deleteMountain: async (req, res) => {
    const mountain = await Mountain.findByPk(req.params.id)
    await mountain.destroy()
    req.flash('success_messages', '已成功移除此筆紀錄')
    return res.redirect('/admin/mountains')
  },
}

module.exports = adminController
