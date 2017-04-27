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
    data.limit = 12;
    data.pages = 0;
    data.category = req.query.category || 'all';

    var where = {};
    if (data.example) {
        where.example = data.example;
    }
    var rule;
    if (data.category == 'query') {
        rule = { '$or': [{ tag: eval('/' + req.query.search + '/i'), des: eval('/' + req.query.search + '/i') }] }
    } else if (data.category == 'all') {
        rule = {}
    } else {
        rule = { tag: eval('/' + req.query.category + '/i') }
    }
    Examples.where(where).count(rule).then(function(count) {
        data.count = count;
        //计算总页数
        data.pages = Math.ceil(data.count / data.limit);
        //取值不能超过pages
        data.page = Math.min(data.page, data.pages);
        //取值不能小于1
        data.page = Math.max(data.page, 1);

        var skip = (data.page - 1) * data.limit;

        Examples.where(where).find(rule).limit(data.limit).skip(skip).then(function(examples) {
            res.render('index', {
                category: data.category,
                examples: examples,
                count: data.count,
                pages: data.pages,
                limit: data.limit,
                page: data.page
            });
        });
    });
});
//详情页
router.get('/details', function(req, res, next) {
    var link = parseInt(req.query.id, 10);
    Examples.count().then(function(count) {
        Examples.findOne({ "link": link }).then(function(example) {
            Examples.findOne({ "link": link - 1 }).then(function(pre) {
                Examples.findOne({ "link": link + 1 }).then(function(next) {
                    res.render('details', {
                        example: example,
                        pre: pre,
                        next: next
                    });
                });
            });
        });
    });

});
module.exports = router;