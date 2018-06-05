var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()
var port = 3000

var username = 'admin'
var password = 'password123'

//use body parser to get params from form
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

app.use(express.static('public'))

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/login', function(req, res, next) {
  if (
    req.body.username &&
    req.body.username === username &&
    req.body.password &&
    req.body.password === password
  ) {
    res.json({ ok: true })
  } else {
    res.status(400).send('Wrong password! Please try again')
  }
})

app.listen('3000')
console.log('App started! At http://localhost:' + port)
