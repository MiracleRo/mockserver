const mongoose = require('mongoose')
const chalk = require('chalk')
const config = require('../config/config')

mongoose.connect(config.url, { useNewUrlParser: true,  useUnifiedTopology: true })

const db = mongoose.connection

db.once('open', () => {
  console.log(
    chalk.green('链接数据库成功'))
})

db.on('error', (err) => {
  console.error(
    chalk.red('Error in MongoDb connection: ' + error)
  )
  mongoose.disconnect();
})

db.on('close', function() {
    console.log(
      chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

module.export = db;