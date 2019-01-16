const mongoose = require('mongoose');
// 1. 链接数据库
// 指定链接的数据库不需要存在，当数据库连接上以后，会自动创建
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

// 2. 设计集合结构
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，过滤脏数据
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comment: [{body: String, data: Date}],
  date: {type: Date, default: Date.now},
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});

// 3. 将文档结构发布为模型
// mongoose.model 将一个架构发布为 model
// 第一个参数：传入一个首字母为大写的名词表示你的数据库的名称，
//            mongoose 自动为你转换成小写的 名词复数集合 BLog => blogs
// 第二个参数：架构 Schame
const Blog = mongoose.model('Blog', blogSchema);

// 4.实例化
let newBlog = new Blog({
  title: 'String',
  author: 'String',
  body: 'String',
  hidden: true,
  meta: {
    votes: 1,
    favs: 2
  }
});

// 5. 操作

newBlog.save((err,res)=>{
  if (err){
    console.log(err);
    console.log('保存失败');
  }else{
    console.log('保存成功');
    console.log(res);
  }
})
