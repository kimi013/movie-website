var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CategorySchema = new Schema({
    name: String,
    movies: [
        {
            type: ObjectId,
            ref: 'Movie'
        }
    ],
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
CategorySchema.pre('save', function (next) {
    if (this.isNew) {  // http://mongoosejs.com/docs/api.html#document_Document-isNew
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});


// http://mongoosejs.com/docs/api.html#schema_Schema-static
CategorySchema.static('fetch', function (callback) {
    return this.find({})  // todo 静态方法中的this是什么？
        .sort('meta.updateAt')
        .exec(callback);
});

CategorySchema.static('findById', function (_id, callback) {
    return this.findOne({_id: _id})
        .sort('meta.updateAt')
        .exec(callback);
});


module.exports = CategorySchema;