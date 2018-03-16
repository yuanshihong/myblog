'use strcit'
import CommentModel from '../models/comment.js'
import PostModel from '../models/posts'

class Comments {
  constructor () {

  }
  async createComments (req, res, next) {
    const author = req.session.user._id
    const postId = req.fields.postId
    const content = req.fields.content
    // 校验参数
    try {
      if (!content.length) {
        throw new Error('请填写留言内容')
      }
    } catch (e) {
      req.flash('error', e.message)
      return res.redirect('back')
    }
    const comment = {
      author: author,
      postId: postId,
      content: content
    }
    try {
      await CommentModel.create(comment)
      await PostModel.increaseCommentCountByPostId(postId)
      req.flash('success', '评论成功')
      res.redirect(`/posts/${postId}`)
    } catch (err) {
      console.log(err)
      req.flash('error', '评论失败')
      res.redirect('back')
    }
  }
  async removeCommentByPostId (req, res, next) {
    const commentId = req.params.commentId
    const postId = req.params.postId
    const author = req.session.user._id
    console.log(req, 'sss')
    try {
      await CommentModel.removeCommentByCommentId(commentId)
      await PostModel.decreaseCommentCountByPostId(postId)
      req.flash('success', '删除评论成功')
      res.redirect('back')
    } catch (err) {
      console.log(err)
      req.flash('error', '删除评论失败')
      res.redirect('back')
    }
  }
}
export default new Comments()