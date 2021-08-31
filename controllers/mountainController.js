const { Mountain, Altitude } = require('../models')

const mountainController = {
  getMountains: async (req, res) => {
    let mountains = await Mountain.findAll({ include: Altitude })
    mountains = mountains.map((d) => ({
      ...d.dataValues,
      description: d.dataValues.description.substring(0, 50),
      altitudeName: d.Altitude.name,
    }))
    return res.render('mountains', { mountains })
  },

  getMountain: async (req, res) => {
    const mountain = await Mountain.findByPk(req.params.id, { include: Altitude })
    return res.render('mountain', { mountain: mountain.toJSON() })
  },
}

module.exports = mountainController
