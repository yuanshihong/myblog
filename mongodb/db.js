'use strict'

import mongoose from 'mongoose'
import chalk from 'chalk'
import config from '../config/default'

mongoose.connect(config.mongodb)
mongoose.Promise = global.Promise

const db = mongoose.connection

db.once('open', () =>{
  console.log(chalk.green('连接数据库成功'))
})

db.on('error', (error) => {
  console.log(chalk.red('Error in MongoDb connection:' + error))
})
db.on('error', (error) => {
  console.log(
    chalk.red('数据库断开，重新连接数据库')
  )
  mongoose.connect(config.mongodb, {server: {auto_reconnect:true}})
})

export default db