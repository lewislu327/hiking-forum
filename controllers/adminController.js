const { Mountain } = require('../models')

const adminController = {
  getMountains: async (req, res) => {
    try {
      const mountains = await Mountain.findAll({ raw: true })
      return res.render('admin/mountains', { mountains })
    } catch (error) {
      console.error(error)
    }
  },

  createMountain: (req, res) => {
    return res.render('admin/create')
  },

  postMountain: async (req, res) => {
    try {
      if (!req.body.name) {
        req.flash('error_messages', "name didn't exist")
        return res.redirect('back')
      }
      await Mountain.create({
        name: req.body.name,
        difficulty: req.body.difficulty,
        address: req.body.address,
        height: req.body.height,
        description: req.body.description,
      })
      req.flash('success_messages', '已成功新增此筆紀錄')
      return res.redirect('/admin/mountains')
    } catch (error) {
      console.error(error)
    }
  },

  getMountain: async (req, res) => {
    const mountain = await Mountain.findByPk(req.params.id, { raw: true })
    console.log(mountain)
    return res.render('admin/mountain', { mountain })
  },

  editMountain: async (req, res) => {
    const mountain = await Mountain.findByPk(req.params.id, { raw: true })
    console.log(mountain)
    return res.render('admin/create', { mountain })
  },

  putMountain: async (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', '未輸入名稱')
      return res.redirect('back')
    }

    const mountain = await Mountain.findByPk(req.params.id)
    await mountain.update({
      name: req.body.name,
      difficulty: req.body.difficulty,
      address: req.body.address,
      height: req.body.height,
      description: req.body.description,
    })

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
