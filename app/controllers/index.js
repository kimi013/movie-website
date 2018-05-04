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
