const router = require('express').Router();
const User = require('../models/user');

router.get('/login', (req, res) => {
  res.render('login.html', {data: 'ready'})
});

router.post('/login.html', async (req, res) => {
  const body = req.body;
  let user = await User.findOne(body);
  if (user) {
    req.session.user = user;
    return res.redirect('/index')
  }
  res.status(500).json(user)

});

router.get('/register', (req, res) => {
  res.render('./register/index.html')
});

router.post('/register.html', async (req, res) => {

  const body = req.body;
  try {
    if (await User.findOne({email: body.email})) {return res.status(200).json({state: 1, message: '账号已存在'})}
    if (await User.findOne({nikename: body.nikename})) {return res.status(200).json({state: 1, message: '账号已存在'})}

    await new User(body).save().then(user => req.session.user = user);

    // res.status(200).json({state: 1, message: '注册成功'})
    return res.redirect('/index')
  } catch (e) {
    res.status(500).json({state: 0, message: e})
  }
});

router.get('/index', async (req, res) => {
  res.render('index.html', {user: req.session.user});
});

router.get('/loginout', async (req, res) => {
  delete req.session.user
  return res.redirect('/login')
});


module.exports = router;
