import express from 'express'
import signin from './signin'
import signup from './signup'
import posts from './posts'
import signout from './signout'
import comments from './comments'

export default (app) => {
  app.use('/signin', signin)
  app.use('/signup', signup)
  app.use('/signout', signout)
  app.use('/posts', posts)
  app.use('/comments', comments)
}
