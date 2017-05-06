/**
 * Created by 14798 on 2017/4/13.
 */

// 初始设置
var fs = require('fs');
var path = require('path');
var express = require('express');

var router = express.Router();

var BookModel = require('../models/books');

//GET书籍录入页面
router.get('/', function (req, res, next) {
    console.log('bookGet');
    res.render('bookSignUp');
});

// POST书籍录入路由library/bookSignup
router.post('/', function (req, res, next) {
    console.log(req);
    console.log('bookPost');
    // 获取变量值
    var bookId = req.fields.bookId;
    var bookTitle = req.fields.bookTitle;
    var bookCover = req.files.bookCover.path.split(path.sep).pop();
    var bookAuthor = req.fields.bookAuthor;
    var bookPress = req.fields.bookPress;
    var bookNum = req.fields.bookNum;
    var bookAbstract = req.fields.bookAbstract;
    var bookSorts = [];
    var bookCan = bookNum;
    var bookBowNum = '0';

    // 根据checkbox判断并写入bookSorts
    var i = 0;
    if (req.fields.english) {
        bookSorts[i] = 'e';// 英语
        i++;
    }
    if (req.fields.computer) {
        bookSorts[i]= 'c';// 计算机
        i++;
    }
    if (req.fields.science) {
        bookSorts[i]= 's';// 科学
        i++;
    }
    if (req.fields.history) {
        bookSorts[i] =  'h';// 历史
        i++;
    }
    if (req.fields.literature) {
        bookSorts[i] = 'l';// 文化
        i=0;
    }

    //模板赋值
    var book={
        bookId: bookId,
        bookTitle : bookTitle,
        bookCover : bookCover,
        bookAuthor : bookAuthor,
        bookPress : bookPress,
        bookSorts : bookSorts,
        bookAbstract : bookAbstract ,
        bookNum : parseInt(bookNum),
        bookCan : parseInt(bookCan),
        bookBowNum: parseInt(bookBowNum)
    };

    BookModel.create(book);//书籍录入记得写纠错
    console.log(book);//打印模板
    res.send();
});

module.exports = router;

