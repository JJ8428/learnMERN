const { Router } = require('express');
const controller = require('../controller/authController');

const router = Router();

router.get('/login', controller.login_get);
router.get('/signup', controller.signup_get);
router.post('/login', controller.login_post);
router.post('/signup', controller.signup_post);
router.get('/logout', controller.logout_get);

// Coding the functions would be messy here, so lets do it in controller

module.exports = router;