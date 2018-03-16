import express from 'express'
import SignIn from '../controller/signin'
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('signin')
})

router.post('/', SignIn.signin)

module.exports = router