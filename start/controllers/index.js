var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'YANWEIQING' });
});
router.get('/404', function(req, res) {
  res.render('404', {
      layout: 'boot'
  });
});

module.exports = router;
