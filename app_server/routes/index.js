var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');
const ctrlTravel = require('../controllers/travel');

/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/travel', ctrlTravel.travel);

module.exports = router;
