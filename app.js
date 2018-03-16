import express from 'express'
import path from 'path'
import config from './config/default'
import routes from './routes'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import flash from 'connect-flash'
import db from './mongodb/db';
import formidable from 'express-formidable'

const app = express()

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
})

// 设置模板目录
app.set('views', path.join(__dirname, 'views'))

// 设置模板为ejs
app.set('view engine', 'ejs')

// 设置静态文件
app.use(express.static(path.join(__dirname, 'public')))

// flash中间件, 用来显示消息提示等
app.use(flash())

// 处理表单及文件上传中间件
app.use(formidable({
  uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
  keepExtensions: true// 保留后缀
}))

const MongoStore = connectMongo(session)
// session 中间件
app.use(session({
  name: config.session.name,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: config.session.maxAge
  },
  store: new MongoStore({
    url: config.mongodb
  })
}))
// 挂载全局变量
app.locals.blog = {
  title: 'myblog',
  description: 'this is my first blog'
}
app.use(function(req, res, next){
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})


routes(app)

app.listen(config.port, function(){
  console.log(`Listening port ${config.port} is running`)
})