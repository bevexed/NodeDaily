const express = require('express')

const app = express();

const tweets = []

app.use(express.json())

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
  res.send('Welcome to Node Twitter')
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

app.listen(8000)

