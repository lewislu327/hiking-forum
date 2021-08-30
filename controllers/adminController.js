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

  postMountain: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    }
    return Mountain.create({
      name: req.body.name,
      difficulty: req.body.difficulty,
      address: req.body.address,
      height: req.body.height,
      description: req.body.description,
    }).then((restaurant) => {
      req.flash('success_messages', 'mountain was successfully created')
      res.redirect('/admin')
    })
  },
}

module.exports = adminController
