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

  deleteComment: async (req, res) => {
    const comment = await Comment.findByPk(req.params.id)
    await comment.destroy()
    return res.redirect(`/mountains/${comment.MountainId}`)
  },
}

module.exports = commentController
