const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewsController.getOverview);
router.get('/tour/:slug', viewsController.getTour);

// /login
router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.getSignUpForm);

router.get('/me', authController.protect, viewsController.getAccount)

module.exports = router;
