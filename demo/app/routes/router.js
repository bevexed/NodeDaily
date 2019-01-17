const router = require('express').Router();
const User = require('../models/user');

router.get('/login', (req, res) => {
  res.render('login.html', {data: 'ready'})
});

router.post('/login.html', (req, res) => {
  console.log(req.body);
  console.log(res);
});

router.get('/register', (req, res) => {
  res.render('./register/index.html')

});

router.post('/register.html', async (req, res) => {

  const body = req.body;
  try {
    if (await User.findOne({email: body.email})) {return res.status(200).json({state: 1, message: '账号已存在'})}
    if (await User.findOne({nikename: body.nikename})) {return res.status(200).json({state: 1, message: '账号已存在'})}

    await new User(body).save();
    res.status(200).json({state: 1, message: '注册成功'})
  } catch (e) {
    res.status(500).json({state: 0, message: '服务器错误'})
  }
});


module.exports = router;
