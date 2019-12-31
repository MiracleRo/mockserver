const db = require("../db/db")
const { Sequelize } = require('sequelize');

const api = db.define('t_user'/*自定义表名*/, {
  // id
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,       //主键
      autoIncrement: true,    //自增
      comment: "自增id"       //注释:只在代码中有效
  },
  // 路径
  url: {
      type: Sequelize.STRING,
      allowNull: false, //不允许为null
  },
  // 方法
  method: {
      type: Sequelize.STRING(10),
      allowNull: false, //不允许为null
  },
  //生成规则
  rule: {
    type: Sequelize.TEXT,
      allowNull: false, //不允许为null
  },
  // 描述状态
  description: {
      type: Sequelize.STRING
  },
  create_time: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false, //不允许为null
  },
  update_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false, //不允许为null
  }
}, {
  //去掉默认的添加时间和更新时间
  timestamps: false,
  indexes:[
    //普通索引,默认BTREE
      {
          unique: true,
          fields: ['id', 'url']
      },
   ]
});
//先删除后同步
api.sync()

module.exports =  api;
