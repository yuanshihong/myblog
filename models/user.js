'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: { type: String, isRequired: true },
  password: { type: String, isRequired: true },
  avatar: { type: String, isRequired: true },
  gender: { type: String, enum: ['m', 'f', 'x'], default: 'x' },
  bio: { type: String, isRequired: true },
})
UserSchema.index({ name: 1 }, { unique: true })

const User = mongoose.model('User', UserSchema)

module.exports = {
  // 创建一个新用户
  create: (user) => {
    User.create(user)
  },
  // 通过用户名获取用户信息
  getUserByName: (name) => {
    return User.findOne({ name: name })
  }
}
