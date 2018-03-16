'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', isRequired: true },
  content: { type: String, required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Posts', required: true }
})
CommentSchema.index({ postId: 1, _id: 1 })

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = {
  // 创建一条评论
  create: (comment) => {
    Comment.create(comment)
  },
  getPostCommentsByPostId: (postId) => {
    return Comment.find({postId: postId}).populate('author').sort({ _id: 1 }).exec()
  },
  removeCommentByCommentId: (commentId) => {
    return Comment.remove({_id: commentId}).exec()
  }
}
