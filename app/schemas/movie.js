var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
    director: String,
    title: String,
    language: String,
    country: String,
    summary: String,
    flash: String,
    poster: String,
    year: String,
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


// http://mongoosejs.com/docs/middleware.html
MovieSchema.pre('save', function (next) {
    if (this.isNew) {  // http://mongoosejs.com/docs/api.html#document_Document-isNew
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});


// http://mongoosejs.com/docs/api.html#schema_Schema-static
MovieSchema.static('fetch', function (callback) {
    return this.find({})  // todo 静态方法中的this是什么？
        .sort('meta.updateAt')
        .exec(callback);
});

MovieSchema.static('findById', function (_id, callback) {
    return this.findOne({_id: _id})
        .sort('meta.updateAt')
        .exec(callback);
});


module.exports= MovieSchema;