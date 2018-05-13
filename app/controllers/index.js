var mongoose = require('mongoose');
var Movie = require('../models/movie');
var Category = require('../models/category');


// 首页
exports.index = function (req, res) {
    Category
        .find({})
        .populate({
            path: 'movies',
            options: {
                limit: 5
            }
        })
        .exec(function (err, categories) {
            if (err) {
                console.log(err)
            }


            res.render('index', {
                title: 'imooc 首页',
                categories: categories
            });
        });
};


// 搜索
exports.search = function (req, res) {
    var catId = req.query.cat;
    var page = parseInt(req.query.p, 10);
    var count = 2;
    var index = (page - 1) * count;

    Category
        .find({
            _id: catId
        })
        .populate({
            path: 'movies',
            // options: {
            //     limit: 2,
            //     // skip: index
            // }
        })
        .exec(function (err, categories) {
            if (err) {
                console.log(err)
            }

            var category = categories[0] || {};
            var movies = category.movies || [];
            var results = movies.slice(index, index + count);

            res.render('results', {
                title: 'imooc 结果列表页',
                keyword: category.name,
                currentPage: page,
                totalPage: Math.ceil(movies.length / count),
                query: 'cat=' + catId,
                movies: results
            });
        });
};