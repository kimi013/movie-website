var Movie = require('../models/movie');
var Category = require('../models/category');
var Comment = require('../models/comment');
var _ = require('lodash');


// 详情页
exports.detail = function (req, res) {
    var id = req.params.id;

    Movie.findById(id, function (err, movie) {
        // if (err) {
        //     console.log(err);
        // }

        Comment
            .find({movie: id})
            .populate('from', 'name')      // todo populate方法
            .populate('reply.from reply.to', 'name')
            .exec(function (err, comments) {
                res.render('detail', {
                    title: 'imooc' + movie.title,
                    movie: movie,
                    comments: comments
                });
            });
    });
};


// 后台录入页
exports.new = function (req, res) {
    Category.find({}, function (err, categories) {
        res.render('admin', {
            title: 'Movie website 后台录入页',
            categories: categories,
            movie: {}
        });
    });
};


// 后台更新页
exports.update = function (req, res) {
    var id = req.params.id;

    if (id) {
        Movie.findById(id, function (err, movie) {
            Category.find({}, function (err, categories) {
                res.render('admin', {
                    title: 'imooc 后台更新页',
                    movie: movie,
                    categories: categories
                });
            });
        });
    }
};


// 创建、更新电影的接口
exports.save = function (req, res) {
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
        _movie = new Movie(movieObj);

        var categoryId = _movie.category;
        // var categoryName = _movie.categoryName;
        var categoryName = movieObj.categoryName;

        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }

            if (categoryId) {
                Category.findById(categoryId, function (err, category) {
                    category.movies.push(_movie._id);

                    category.save(function (err, category) {
                        res.redirect('/movie/' + movie._id);
                    });
                });
            } else if (categoryName) {
                var category = new Category({
                    name: categoryName,
                    movies: [movie._id]
                });

                category.save(function (err, category) {
                    movie.category = category._id;
                    movie.save(function (err, movie) {
                        res.redirect('/movie/' + movie._id);
                    });
                });
            }
        });
    }
};


// 列表页
exports.list = function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: 'imooc 列表页',
            movies: movies
        });
    });
};


// 删除电影的接口
exports.del = function (req, res) {
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
};