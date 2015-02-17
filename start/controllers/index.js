var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'YANWEIQING' });
});
router.get('/paper', function(req, res) {
  res.render('paper', { title: 'YANWEIQING' });
});


router.get('/404', function(req, res) {
  res.render('404', {
      layout: 'boot',
      title:'404'
  });
});


/*dashboard*/
router.get('/end', function(req, res) {
  res.render('dashboard', {
      layout: 'end',
      title:'BACK DASHBOARD'
  });
});


/**/
router.get('/reg', function(req, res) {
  res.render('reg', {
      layout: 'boot',
      title: '注册'
  });
});
router.post('/reg', function(req, res) {
});
router.post('/post', function(req, res) {
    res.render('post', {
        layout: 'boot',
        title: '发表'
    });
});
router.post('/post', function(req, res) {
});
router.post('/login', function(req, res) {
    res.render('login', {
        layout: 'boot',
        title: '登陆'
    });
});
router.post('/login', function(req, res) {
});
router.post('/logout', function(req, res) {
});


module.exports = router;
