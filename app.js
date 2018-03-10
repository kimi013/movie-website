var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 4406;

app.set('views', './views/pages');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'static')));

// index page
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Movie website 首页',
        movies: [
            {
                title: '机械战警',
                _id: 1,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
            },
            {
                title: '机械战警',
                _id: 2,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
            },
            {
                title: '机械战警',
                _id: 3,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
            },
            {
                title: '机械战警',
                _id: 4,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
            },
            {
                title: '机械战警',
                _id: 5,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
            },
            {
                title: '机械战警',
                _id: 6,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
            }
        ]
    });
});

// detail page
app.get('/movie/:id', function (req, res) {
    res.render('detail', {
        title: 'Movie website 详情页',
        movie: {
            director: '何塞·帕迪利亚',
            country:'美国',
            title:'机械战警',
            year:2014,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
            language:'英语',
            flash:'http://player.youku.com/player.php/sid/XNjMyMTkzODcy/v.swf',
            summary: '2028年，专事军火开发的机器人公司Omni Corp.生产了大量装备精良的机械战警，' +
            '他们被投入到惩治犯罪等行动中，取得显著的效果。罪犯横行的底特律市，' +
            '嫉恶如仇、正义感十足的警察亚历克斯·墨菲（乔尔·金纳曼 饰）遭到仇家暗算，身体受到毁灭性破坏。' +
            '借助于Omni公司天才博士丹尼特·诺顿（加里·奥德曼 饰）最前沿的技术，墨菲以机械战警的形态复活。' +
            '数轮严格的测试表明，墨菲足以承担起维护社会治安的重任，他的口碑在民众中直线飙升，' +
            '而墨菲的妻子克拉拉（艾比·考尼什 饰）和儿子大卫却再难从他身上感觉亲人的温暖。' +
            '感知到妻儿的痛苦，墨菲决心向策划杀害自己的犯罪头子展开反击……'
        }
    });
});

// admin page
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

// list page
app.get('/admin/list', function (req, res) {
    res.render('list', {
        title: 'Movie website 列表页',
        movies: [
            {
                title:'机械战警',
                _id: 1,
                director: '何塞·帕迪利亚',
                country:'美国',
                year:2014,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
                language:'英语',
                flash:'http://player.youku.com/player.php/sid/XNjMyMTkzODcy/v.swf',
                summary: '2028年，专事军火开发的机器人公司Omni Corp.生产了大量装备精良的机械战警，' +
                '他们被投入到惩治犯罪等行动中，取得显著的效果。罪犯横行的底特律市，' +
                '嫉恶如仇、正义感十足的警察亚历克斯·墨菲（乔尔·金纳曼 饰）遭到仇家暗算，身体受到毁灭性破坏。' +
                '借助于Omni公司天才博士丹尼特·诺顿（加里·奥德曼 饰）最前沿的技术，墨菲以机械战警的形态复活。' +
                '数轮严格的测试表明，墨菲足以承担起维护社会治安的重任，他的口碑在民众中直线飙升，' +
                '而墨菲的妻子克拉拉（艾比·考尼什 饰）和儿子大卫却再难从他身上感觉亲人的温暖。' +
                '感知到妻儿的痛苦，墨菲决心向策划杀害自己的犯罪头子展开反击……'
            }
        ]
    });
});

app.listen(port, function () {
    console.log('App running at port ' + port);
});