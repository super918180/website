var express = require('express');
var router = express.Router();
var Examples = require('../models/Example');
var data;
//出来通用数据
router.use(function(req, res, next) {
    data = {
        examples: []
    };
    Examples.find().then(function(examples) {
        data.examples = examples;
        next();
    });
});

router.get('/', function(req, res, next) {
    data.examples = req.query.examples || '';
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 10;
    data.pages = 0;

    var where = {};
    if (data.example) {
        where.example = data.example;
    }

    Examples.where(where).count().then(function(count) {
        data.count = count;
        //计算总页数
        data.pages = Math.ceil(data.count / data.limit);
        //取值不能超过pages
        data.page = Math.min(data.page, data.pages);
        //取值不能小于1
        data.page = Math.max(data.page, 1);

        var skip = (data.page - 1) * data.limit;

        Examples.where(where).find().limit(data.limit).skip(skip).then(function(examples) {
            res.render('index', {
                examples: examples,
                count: data.count,
                pages: data.pages,
                limit: data.limit,
                page: data.page
            });
        });
    });
});

module.exports = router;