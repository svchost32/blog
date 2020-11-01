var express = require('express')
var User = require('./model/user')
var Comment = require('./model/comments')
var md5 = require('blueimp-md5')
const user = require('./model/user')
const cmts = require('./model/comments')
const consolep = require('./public/js/console')


var router = express.Router()

router.get('/', function (req, res) {
    res.render('index.html', {
        name: 'Master'
    })
})
router.get('/main', async function (req, res) {
    // console.log(req.session)
    // console.log(req.session.user)
     
    var contents = await Comment.find().then((result)=>{
        return result
        })
    // console.log(contents);
    res.render('main.html', {
        name: 'Master',
        user: req.session.user,
        error: null,
        comments: contents
    })

})
router.get('/login', function (req, res) {
    res.render('login.html')
})

router.post('/login', async function (req, res) {
    var body_content = req.body

    try {
        await User.findOne({
            email: body_content.email,
            password: md5(md5(body_content.password))
        }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    status_code: 500,
                    message: err.message
                })
            }
            if (!user) {
                return res.status(200).json({
                    status_code: 1,
                    message: 'Invaild email or password'
                })
            }

            req.session.user = user
            res.status(200).json({
                status_code: 0,
                message: 'ok'
            })

        })

    } catch (error) {
        return res.status(500).json({
            status_code: 500,
            message: error.message
        })



    }
})

router.get('/register', function (req, res) {
    res.render('register.html')
})

router.post('/register', async function (req, res) {
    //获取提交数据
    //  req.body
    //操作响应
    // 判断是否存在，不存在注册，存在拒绝
    //redirect
    //
    var body_content = req.body

    try {
        if (await User.findOne({
                email: body_content.email
            })) {
            return res.status(200).json({
                status_code: 1,
                message: 'email already exists'
            })
        }
        if (await User.findOne({
                nickname: body_content.nickname
            })) {
            return res.status(200).json({
                status_code: 2,
                message: 'nickname already exists'
            })
        }
        body_content.password = md5(md5(body_content.password)) //密码加密
        // await new User(body_content).save(function (err,user) {  
        //     console.log(user)
        //     console.log('step1'+req.session.user);
        //     req.session.user = user
        //     console.log(req.session)
        //     console.log('step2'+req.session.user);
        // })

        await new User(body_content).save()
        // req.session.user = body_content

        //注册成功记录状态


        res.status(200).json({
            status_code: 0,
            message: 'ok'
        })

    } catch (error) {
        return res.status(500).json({
            status_code: 500,
            message: error.message
        })



    }

})

router.get('/comments', async function (req, res) {
    // console.log(req.session.user ===undefined);
    if (req.session.user === null||req.session.user===undefined) {
        // alert('Login First!')
        res.render('main.html', {
            name: 'Master',
            error: {
                message:'请先登录',
                backcolor:'background:#fd79a8',
                icon:'/public/img/login-error.png'
                
            },
            comments:await Comment.find().then((result)=>{
                return result
                })
        })
        // req.session.error = '请先登录'
        // res.redirect('/main')
    } else {
        // console.log(req.session.user);
        // console.log(req.session.user.email);
        res.render('comments.html', {
            // email:req.session.user.email,
            // nickname:req.session.user.nickname,
            // password:req.session.user.password,
            // avator:req.session.user.avator
            user:req.session.user

        })
    }
})


router.post('/comments', async function (req, res) {
    var body_content = req.body
    // console.log(req.body)
    try {
        // if (await User.findOne({
        //         email: body_content.email
        //     })) {
        //     return res.status(200).json({
        //         status_code: 1,
        //         message: 'email already exists'
        //     })
        // }
        // if (await User.findOne({
        //         nickname: body_content.nickname
        //     })) {
        //     return res.status(200).json({
        //         status_code: 2,
        //         message: 'nickname already exists'
        //     })
        // }
       

        await new Comment(body_content).save()
        // req.session.user = body_content

        //注册成功记录状态


        res.status(200).json({
            status_code: 0,
            message: 'ok'
        })

    } catch (error) {
        return res.status(500).json({
            status_code: 500,
            message: error.message
        })

    }
})



router.get('/logout', function (req, res) {
    req.session.user = null
    res.redirect('/main')
})

router.get('/ip', function (req, res) {

    // req.session.user = null
    res.send('192.168.1.215')
    res.end('192.168.1.215')
})

router.get('/console', function (req, res) {

    // req.session.user = null
    console.log(consolep.exec('dir'))
    res.end('success')
})


module.exports = router