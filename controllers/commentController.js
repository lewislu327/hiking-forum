const { Comment } = require('../models')

const commentController = {
  postComment: async (req, res) => {
    await Comment.create({
      text: req.body.text,
      MountainId: req.body.mountainId,
      UserId: req.user.id,
    })
    return res.redirect(`/mountains/${req.body.mountainId}`)
  },
}

module.exports = commentController
