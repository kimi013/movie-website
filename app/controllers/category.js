var Category = require('../models/category');
var _ = require('lodash');


// 后台分类录入页
exports.new = function (req, res) {
    res.render('categoryAdmin', {
        title: 'Movie website 后台分类录入页',
        category: {}
    });
};


// 创建、更新分类的接口
exports.save = function (req, res) {
    var _category = req.body.category;
    var category = new Category(_category);

    category.save(function (err, category) {
        if (err) {
            console.log('err: ', err);
        }

        res.redirect('/admin/category/list');
    });
};


// 分类列表页
exports.list = function (req, res) {
    Category.fetch(function (err, categories) {
        if (err) {
            console.log(err);
        }

        res.render('categorylist', {
            title: '分类列表页',
            categories: categories
        });
    });
};