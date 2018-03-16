'use strict'
import path from 'path'
import UserModel from '../models/user'
import sha1 from 'sha1'

class SignUp {
  constructor () {

  }
  renderPage(req, res, next) {
    res.render('signup')
  }
 async signUp (req, res, next) {
    const name = req.fields.name
    const gender = req.fields.gender
    const bio = req.fields.bio
    const avatar = req.files.avatar.path.split(path.sep).pop()
    let password = req.fields.password
    const repassword = req.fields.repassword
    // 校验参数
    try {
      if (!(name.length >= 1 && name.length <= 10)) {
        throw new Error('名字请限制在 1-10 个字符')
      }
      if (['m', 'f', 'x'].indexOf(gender) === -1) {
        throw new Error('性别只能是 m、f 或 x')
      }
      if (!(bio.length >= 1 && bio.length <= 30)) {
        throw new Error('个人简介请限制在 1-30 个字符')
      }
      if (!req.files.avatar.name) {
        throw new Error('缺少头像')
      }
      if (password.length < 6) {
        throw new Error('密码至少 6 个字符')
      }
      if (password !== repassword) {
        throw new Error('两次输入密码不一致')
      }
    } catch (e) {
      // 注册失败，异步删除上传的头像
      req.flash('error', e.message)
    }
    // 明文密码加密
    password = sha1(password)
    let user = {
      name: name,
      password: password,
      gender: gender,
      bio: bio,
      avatar: avatar
    }
    // 用户信息写入数据库
    try {
      await UserModel.create(user)
      req.flash('success', '新用户创建成功,请登录')
      res.redirect('/signin')
    } catch (e) {
      // 注册失败，异步删除上传的头像
      fs.unlink(req.files.avatar.path)
      // 用户名被占用则跳回注册页，而不是错误页
      if (e.message.match('duplicate key')) {
        req.flash('error', '用户名已被占用')
        return res.redirect('/signup')
      }
      next(e)
    }
  }
}
export default new SignUp()