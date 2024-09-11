var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var usersRouter = require('./routes/users')
var swaggerUi = require('./routes/swagger')
var yapi = require('./routes/yapi')
var openai = require('./routes/openai')
var app = express()

const translateText = require('./deepseekTranslate')

// ... 其他代码 ...

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/users', usersRouter)
app.use('/swagger', swaggerUi)
app.use('/yapi', yapi)
app.use('/openai', openai)
app.post('/translate', async (req, res) => {
  const { text } = req.body
  try {
    const translatedText = await translateText(text)
    res.json({ translatedText })
  } catch (error) {
    console.error('Translation error:', error)
    res.status(500).json({ error: 'Translation failed' })
  }
})

// app.set('view engine', 'jade') // 或者您使用的其他模板引擎
// app.set('views', path.join(__dirname, 'views'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // 发送错误响应
  res.status(err.status || 500)
  res.json({ error: err.message }) // 使用 res.json 而不是 res.render
})

module.exports = app
