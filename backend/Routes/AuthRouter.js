const { signupValidation, signinValidation } = require('../Middleware/AuthValidation');
const { signup, signin } = require('../Controllers/AuthController');

const router = require('express').Router();

// Route to handle user signup
router.post('/signup', signupValidation, signup);

// Route to handle user signin
router.post('/signin', signinValidation, signin);

module.exports = router;