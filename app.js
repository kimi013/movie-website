var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var moment = require('moment');
var morgan = require('morgan');

var app = express();
var port = process.env.PORT || 4406;
var dbUrl = 'mongodb://localhost:27017/imooc';

mongoose.connect(dbUrl)

app.locals.moment = moment;
app.set('views', './views/pages');
app.set('view engine', 'pug');

// bodyParser的用法
// https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));

// https://github.com/expressjs/cookie-parser
app.use(cookieParser());

// https://github.com/expressjs/session
app.use(session({
    secret: 'imooc',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}));

app.use(express.static(path.join(__dirname, 'static')));

app.listen(port, function () {
    console.log('App running at port ' + port);
});

if (app.get('env') === 'development') {
    app.set('showStackError',  true);           // 错误上屏
    app.use(morgan('combined'));    // morgan
    app.locals.pretty = true;                   // 代码不压缩
    mongoose.set('debug', true);                // debug模式
}

require('./config/routes')(app);

