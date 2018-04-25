var User = require('../models/user');


// 注册
exports.signup = function (req, res) {
    var _user = req.body.user;

    User.findOne({name: _user.name}, function (err, user) {
        if (err) {
            console.log(err);
        }

        if (user) {
            return res.redirect('/signin');
        } else {
            var newUser = new User(_user);

            newUser.save(function (err, user) {
                if (err) {
                    console.log(err);
                }

                res.redirect('/');
            });
        }
    });
};


// 登录
exports.signin = function (req, res) {
    var _user = req.body.user;

    var name = _user.name,
        password = _user.password;

    User.findOne({name: name}, function (err, user) {
        if (err) {
            console.log(err);
        }

        if (!user) {
            return res.redirect('/signup');
        }

        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                console.log(err);
            }

            if (isMatch) {
                // 登录状态存到session里
                req.session.user = user;

                console.log('Password is matched');
                return res.redirect('/');
            } else {
                console.log('Password is not matched');
                return res.redirect('/signin');
            }
        });
    })
};


// 注册页
exports.showSignup = function (req, res) {
    res.render('signup', {
        title: '注册页面'
    });
};


// 登录页
exports.showSignin = function (req, res) {
    res.render('signin', {
        title: '登录页面'
    });
};


// 登出
exports.logout = function (req, res) {
    delete req.session.user;
    // delete app.locals.user;

    res.redirect('/');
};


// 用户列表页
exports.list = function (req, res) {
    User.fetch(function (err, users) {
        if (err) {
            console.log(err);
        }

        res.render('userlist', {
            title: 'imooc 用户列表页',
            users: users
        });
    });
};


// 检测登录中间件
exports.signinRequired = function (req, res, next) {
    var user = req.session.user;

    if (!user) {
        return res.redirect('/signin');
    }

    next();
};


// 监测管理员中间件
exports.adminRequired = function (req, res, next) {
    var user = req.session.user;

    if (!user || user.role <= 10) {
        return res.redirect('/signin');
    }

    next();
};