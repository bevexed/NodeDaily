const mongoose = require('mongoose');
// 1. 链接数据库
// 指定链接的数据库不需要存在，当数据库连接上以后，会自动创建
mongoose.connect('mongodb://localhost:27017/user', {useNewUrlParser: true});

// 2. 设计集合结构
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，过滤脏数据
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true
  }
});

// 2. MongoDB 是动态的，只需在代码中设计数据库
const Cat = mongoose.model('Cat', {name: String});

//  2.实例化
const kitty = new Cat({name: 'Zildjian'});

kitty.save().then(() => console.log('meow'));
