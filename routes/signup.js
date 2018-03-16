import express from 'express'
import SignUp from '../controller/signup'
const router = express.Router()

router.get('/', SignUp.renderPage)

router.post('/', SignUp.signUp)

export default router