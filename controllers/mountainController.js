const { Mountain, Altitude, Comment, User } = require('../models')
const pageLimit = 10

const mountainController = {
  getMountains: async (req, res) => {
    let offset = 0
    const whereQuery = {}
    let altitudeId = ''
    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    if (req.query.altitudeId) {
      altitudeId = Number(req.query.altitudeId)
      whereQuery.AltitudeId = altitudeId
    }
    const totalMountain = await Mountain.findAll({
      raw: true,
      nest: true,
    })

    let mountains = await Mountain.findAll({
      where: whereQuery,
      include: Altitude,
      offset: offset,
      limit: pageLimit,
    })

    mountains = mountains.map((d) => ({
      ...d.dataValues,
      description: d.dataValues.description.substring(0, 50),
      altitudeName: d.Altitude.name,
      isFavorited: req.user.FavoritedMountains.map((d) => d.id).includes(d.id),
    }))

    const page = Number(req.query.page) || 1
    const pages = Math.ceil(totalMountain.length / pageLimit)
    const totalPage = Array.from({ length: pages }).map((item, index) => index + 1)
    const prev = page - 1 < 1 ? 1 : page - 1
    const next = page + 1 > pages ? pages : page + 1

    const altitudes = await Altitude.findAll({ raw: true, nest: true })
    return res.render('mountains', {
      mountains,
      altitudes,
      altitudeId,
      page: page,
      totalPage: totalPage,
      prev: prev,
      next: next,
    })
  },

  getMountain: async (req, res) => {
    const mountain = await Mountain.findByPk(req.params.id, {
      include: [
        { model: Altitude },
        { model: Comment, include: [User] },
        { model: User, as: 'FavoritedUsers' },
      ],
    })
    console.log(mountain.FavoritedUsers)
    const isFavorited = await mountain.FavoritedUsers.map((d) => d.id).includes(req.user.id)
    return res.render('mountain', { mountain: mountain.toJSON(), isFavorited })
  },

  getFeeds: async (req, res) => {
    const mountains = await Mountain.findAll({
      limit: 10,
      raw: true,
      nest: true,
      order: [['createdAt', 'DESC']],
      include: [Altitude],
    })
    const comments = await Comment.findAll({
      limit: 10,
      raw: true,
      nest: true,
      order: [['createdAt', 'DESC']],
      include: [User, Mountain],
    })
    return res.render('feeds', {
      mountains,
      comments: comments,
    })
  },
}

module.exports = mountainController
