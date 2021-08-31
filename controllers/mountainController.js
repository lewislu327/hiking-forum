const { Mountain, Altitude } = require('../models')

const mountainController = {
  getMountains: async (req, res) => {
    const whereQuery = {}
    let altitudeId = ''
    if (req.query.categoryId) {
      altitudeId = Number(req.query.categoryId)
      whereQuery.AltitudeId = altitudeId
    }
    let mountains = await Mountain.findAll({ where: whereQuery, include: Altitude })
    const altitudes = await Altitude.findAll({ raw: true, nest: true })
    mountains = mountains.map((d) => ({
      ...d.dataValues,
      description: d.dataValues.description.substring(0, 50),
      altitudeName: d.Altitude.name,
    }))
    return res.render('mountains', { mountains, altitudes, altitudeId })
  },

  getMountain: async (req, res) => {
    const mountain = await Mountain.findByPk(req.params.id, { include: Altitude })
    return res.render('mountain', { mountain: mountain.toJSON() })
  },
}

module.exports = mountainController
