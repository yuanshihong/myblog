'use strict'
import PostsModel from '../models/posts'
import CommentModel from '../models/comment'

class Posts {
  constructor () {

  }
  async renderPage (req, res, next) {
    const author = req.query.author
    try {
      let posts = await PostsModel.getPosts(author)
      res.render('posts', {
        posts: posts
      })
    } catch (e) {
      console.log(e)
      req.flash('获取文章失败')
    }
  }
  async renderPostPage (req, res, next) {
    const postId = req.params.postId
    try {
      await PostsModel.increasePvCountByPostId(postId)
      let post = await PostsModel.getPostByPostId(postId)
      let comments = await CommentModel.getPostCommentsByPostId(postId)
      console.log('comments')
      res.render('post', {
        post: post,
        comments: comments
      })
    } catch (e) {
      req.flash('error', '获取文章失败')
      res.redirect('back')
    }
  }
  async renderEditPage (req, res, next) {
    const postId = req.params.postId
    try {
      let post = await PostsModel.getPostByPostId(postId)
      res.render('edit', {
        post: post
      })
    } catch (e) {
      req.flash('error', '获取文章失败')
      res.redirect('back')
    }
  }
  async createPost (req, res, next) {
    const author = req.session.user._id
    const title = req.fields.title
    const content = req.fields.content
     // 校验参数
    try {
      if (!title.length) {
        throw new Error('请填写标题')
      }
      if (!content.length) {
        throw new Error('请填写内容')
      }
    } catch (e) {
      req.flash('error', e.message)
      return res.redirect('back')
    }
    let post = {
      author: author,
      title: title,
      content: content
    }
    try {
      await PostsModel.createPost(post)
      req.flash('success', '发表成功')
      res.redirect(`/posts?author=${author}`)
    } catch (e) {
      req.flash('error', '新建文章失败')
      res.redirec('back')
    }
  }
  async updatePost (req, res, next) {
    const postId = req.params.postId
    const author = req.session.user._id
    const title = req.fields.title
    const content = req.fields.content

     // 校验参数
    try {
      if (!title.length) {
        throw new Error('请填写标题')
      }
      if (!content.length) {
        throw new Error('请填写内容')
      }
    } catch (e) {
      req.flash('error', e.message)
      return res.redirect('back')
    }
    try {
      await PostsModel.updatePostByPostId(postId, { title: title, content: content })
      req.flash('success', '发表成功')
      res.redirect(`/posts?author=${author}`)
    } catch (e) {
      console.log(e)
      res.redirect('back')
    }
  }
  async removePost (req, res, next) {
    const postId = req.params.postId
    try {
      await PostsModel.removePostByPostId(postId)
      req.flash('success', '删除成功')
      res.redirect('/posts')
    } catch (e) {
      console.log(e.message)
      res.redirect('back')
    }
  }
}

export default new Posts()