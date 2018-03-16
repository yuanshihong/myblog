import express from 'express'
import Comments from '../controller/comments'

const router = express.Router()

router.post('/', Comments.createComments)

router.get('/:postId/:commentId/remove', Comments.removeCommentByPostId)

module.exports = router