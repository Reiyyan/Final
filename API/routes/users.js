var express = require('express');
var router = express.Router();
var users = require('../controllers/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', async function (req, res, next) {
  const response = await users.UserLogin(req.body.username, req.body.password);
  res.send(response.data);
});

router.post('/signup', async function (req, res, next) {
  const response = await users.SignUp(req.body.username, req.body.password);
  res.send(response.data);
});

module.exports = router;