import express from 'express'
import SignOut from '../controller/signout'
const router = express.Router()

router.get('/', SignOut.signOut)

module.exports = router