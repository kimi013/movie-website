var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');


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
    app.post('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.save);

    // 列表页
    app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list);

    // 删除电影的接口
    app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del);
};

