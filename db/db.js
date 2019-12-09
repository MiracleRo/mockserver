const { Sequelize } = require('sequelize');
const chalk = require('chalk')

const sequelize = new Sequelize('mock_api', 'root', 'qwerty!@#', {
  host: 'localhost',
  dialect: 'mysql'
});


sequelize
  .authenticate()
  .then(() => {
    console.log(chalk.green(`连接数据库成功!`))
  })
  .catch(err => {
    console.log(chalk.red(`连接数据库失败: ${err}`))
  });

module.exports = sequelize