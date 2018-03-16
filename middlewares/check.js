class Check {
  constructor () {

  }
  checkLogin (req, res, next) {
    if (!req.session) {
      req.flash('error', '未登录')
      return res.redirect('/signin')
    }
    next()
  }
  checkNotLogin (req, res ,next) {
    if (req.session) {
      req.flash('success', '已登录')
      return res.redirect('back')
    }
    next()
  }
}
export default new Check()