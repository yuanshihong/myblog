import express from 'express'
import Check from '../middlewares/check'
import Posts from '../controller/posts'

const router = express.Router()

router.get('/', Posts.renderPage)

router.get('/create', Check.checkLogin, (req, res, next) => {
  res.render('create')
})

router.post('/create', Check.checkLogin, Posts.createPost)

router.get('/:postId', Check.checkLogin, Posts.renderPostPage)

router.get('/:postId/edit', Check.checkLogin, Posts.renderEditPage)

router.post('/:postId/edit', Check.checkLogin, Posts.updatePost)

router.get('/:postId/remove', Check.checkLogin, Posts.removePost)

export default router