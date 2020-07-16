const express = require('express')

const app = express();

const tweets = []


app.set("views", __dirname + "/views");

app.set('view engine', 'ejs')


app.use(express.json())

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
  let title = 'Chirpie',
    header = 'Welcome to Chirpie'
  res.render('index', {
    title: title,
    header: header,
    tweets: tweets,
    body: 1,
    stylesheets: ['/public/style.css']
  })
})

app.post('/send', function (req, res) {
  console.log(req.body);
  if (req.body && req.body.tweet) {
    tweets.push(req.body.tweet)
    res.send({ status: "ok", message: "Tweet received" })
  } else { // 没有 tweet ？
    res.send({ status: "nok", message: "No tweet received" })
  }
})

app.get('/tweets', function (req, res) {
  res.send(tweets)
})

app.listen(7000)

