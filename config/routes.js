var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');
var Category = require('../app/controllers/category');


module.exports = function (app) {
    // 预处理user
    app.use(function (req, res, next) {
        app.locals.user = req.session.user;    // todo 全局变量赋值
        next();
    });


    // 首页
    app.get('/', Index.index);


    //// 用户
    // 注册接口
    app.post('/user/signup', User.signup);

    // 登录接口
    app.post('/user/signin', User.signin);

    // 登录页面
    app.get('/signin', User.showSignin);

    // 注册页面
    app.get('/signup', User.showSignup);

    // 登出接口
    app.get('/logout', User.logout);

    // 用户列表页
    app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);


    //// 电影
    // 详情页
    app.get('/movie/:id', Movie.detail);

    // 后台录入页
    app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new);

    // 后台更新页
    app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);

    // 创建、更新电影的接口
    app.post('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.savePoster, Movie.save);

    // 列表页
    app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list);

    // 删除电影的接口
    app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del);


    //// 评论
    // 提交评论接口
    app.post('/user/comment', User.signinRequired, Comment.save);


    //// 分类
    // 后台分类录入页
    app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new);

    // 创建、更新分类的接口
    app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save);

    // 列表页
    app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list);


    //// 结果
    app.get('/results', Index.search);
};

