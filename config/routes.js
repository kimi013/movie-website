var Movie = require('../models/movie');
var User = require('../models/user');
var _ = require('lodash');

module.exports = function (app) {
    // 预处理user
    app.use(function (req, res, next) {
        var _user = req.session.user;

        if (_user) {
            app.locals.user = _user;     // todo 全局变量赋值
        }
        return next();
    });

    // 首页
    app.get('/', function (req, res) {

        Movie.fetch(function (err, movies) {
            if (err) {
                console.log(err)
            }

            res.render('index', {
                title: 'imooc 首页',
                movies: movies
            });
        });
    });


    // 注册
    app.post('/user/signup', function (req, res) {
        var _user = req.body.user;

        User.findOne({name: _user.name}, function (err, user) {
            if (err) {
                console.log(err);
            }

            if (user) {
                return res.redirect('/');
            } else {
                var newUser = new User(_user);

                newUser.save(function (err, user) {
                    if (err) {
                        console.log(err);
                    }

                    res.redirect('/admin/userlist');
                });
            }
        });
    });

    // 登录
    app.post('/user/signin', function (req, res) {
        var _user = req.body.user;

        var name = _user.name,
            password = _user.password;

        User.findOne({name: name}, function (err, user) {
            if (err) {
                console.log(err);
            }

            if (!user) {
                return res.redirect('/');
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
                }
            });
        })
    });


    // 登出
    app.get('/logout', function (req, res) {
        delete req.session.user;
        delete app.locals.user;

        res.redirect('/');
    });


    // 用户列表页
    app.get('/admin/userlist', function (req, res) {
        User.fetch(function (err, users) {
            if (err) {
                console.log(err);
            }

            res.render('userlist', {
                title: 'imooc 用户列表页',
                users: users
            });
        });
    });

    // 详情页
    app.get('/movie/:id', function (req, res) {
        var id = req.params.id;

        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            res.render('detail', {
                title: 'imooc' + movie.title,
                movie: movie
            });
        });
    });

    // 后台录入页
    app.get('/admin/movie', function (req, res) {
        res.render('admin', {
            title: 'Movie website 后台录入页',
            movie: {
                title: '',
                director: '',
                country: '',
                year: '',
                poster: '',
                flash: '',
                summary: '',
                language: ''
            }
        });
    });

    // 后台更新页
    app.get('/admin/update/:id', function (req, res) {
        var id = req.params.id;

        if (id) {
            Movie.findById(id, function (err, movie) {
                res.render('admin', {
                    title: 'imooc 后台更新页',
                    movie: movie
                });
            });
        }
    });

    // 创建、更新电影的接口
    app.post('/admin/movie/new', function (req, res) {
        var id = req.body.movie.id;
        var movieObj = req.body.movie;
        var _movie = {};

        if (id) {
            Movie.findById(id, function (err, movie) {
                if (err) {
                    console.log(err);
                }
                _movie = Object.assign(movie, movieObj);

                _movie.save(function (err, movie) {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/movie/' + movie._id);
                });
            });
        } else {
            _movie = new Movie({
                director: movieObj.director,
                title: movieObj.title,
                country: movieObj.country,
                language: movieObj.language,
                year: movieObj.year,
                poster: movieObj.poster,
                summary: movieObj.summary,
                flash: movieObj.flash,
            });

            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            });
        }
    });

    // 列表页
    app.get('/admin/list', function (req, res) {
        Movie.fetch(function (err, movies) {
            if (err) {
                console.log(err);
            }
            res.render('list', {
                title: 'imooc 列表页',
                movies: movies
            });
        });
    });

    // 删除电影的接口
    app.delete('/admin/list', function (req, res) {
        var id = req.query.id;
        Movie.remove({_id: id}, function (err) {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    msg: '删除成功',
                    id,
                    success: 1
                });
            }
        });
    });
};

