var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');   // bcrypt需要很多依赖，所以使用bcryptjs
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    name: {
        unique: true,    // todo unique属性的含义
        type: String
    },
    password: {   // 加盐的密码哈希后的值
        unique: true,
        type: String
    },
    meta: {  // 录入或更新的时间记录
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        },
    }
});


UserSchema.pre('save', function (next) {
    var user = this;

    if (this.isNew) {  // http://mongoosejs.com/docs/api.html#document_Document-isNew
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        })
    });
});


// 核对密码
UserSchema.method('comparePassword', function (_password, cb) {
    var _self = this;
    bcrypt.compare(_password, _self.password, function (err, isMatch) {

        if (err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
});


UserSchema.static('fetch', function (callback) {
    return this.find({})
        .sort('meta.updateAt')
        .exec(callback);
});

// todo 已经存在的方法 ?
UserSchema.static('findById', function (_id, callback) {
    return this.findOne({_id: _id})
        .sort('meta.updateAt')
        .exec(callback);
});


module.exports = UserSchema;
