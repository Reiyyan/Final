var express = require('express');
var router = express.Router();
var words = require('../controllers/words');

/* GET users listing. */
router.get('/:id', async function (req, res, next) {
  const response = await words.GetWord(req.params.id);
  res.send(response);
});

router.post('/add', async function (req, res, next) {
  const response = await words.AddWord(req.body);
  res.send(response.data);
});

module.exports = router;