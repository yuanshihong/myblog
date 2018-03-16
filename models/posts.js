'use strict'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', isRequired: true },
  title: { type: String, isRequired: true },
  content: { type: String, isRequired: true },
  pv: { type: Number, default: 0 },
  commentsCount: {type: Number, default: 0}
})
PostSchema.index({author: 1}, {_id: -1})
const Post = mongoose.model('Post', PostSchema)


module.exports = {
  createPost: (post) => {
    Post.create(post)
  },
  updatePostByPostId: (postId, data) => {
  return Post.findOneAndUpdate({_id: postId}, {$set: data}).exec()
  },
  removePostByPostId: (postId) => {
    return Post.findByIdAndRemove({_id: postId}).exec()
  },
  getPosts: (author) => {
    let query = {}
    if (author) {
      query.author = author
    }
    return Post.find(query).populate('author').sort({_id: -1})
  },
  getPostByPostId: (postId) => {
    return Post.findOne({_id: postId}).populate('author').exec()
  },
  increasePvCountByPostId: (postId) => {
    return Post.findOneAndUpdate({_id: postId}, {$inc: { pv: 1 }})
  },
  increaseCommentCountByPostId: (postId) => {
    return Post.findOneAndUpdate({_id: postId}, {$inc: { commentsCount: 1 }})
  },
  decreaseCommentCountByPostId: (postId) => {
    return Post.findOneAndUpdate({_id: postId}, {$inc: { commentsCount: -1 }})
  }

}