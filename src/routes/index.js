const router = require('express-promise-router')();
const { index } = require('../controllers/index');
router.get('/', index);
module.exports = router;