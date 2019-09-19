const router = require('express').Router();

const AuthController = require('../controllers/auth');

router.get('/signin', AuthController.signin);
router.get('/callback', AuthController.callback);
router.get('/refresh', AuthController.refresh);

module.exports = router;