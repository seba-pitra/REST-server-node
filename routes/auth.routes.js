const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');

const { validateFields } = require('../middlewares/validate.fields');
const { emailAlreadyExists } = require('../helpers/db.validators');

const router = Router();

router.post('/', [
  check('email', 'Email is required').not().isEmpty(),
  check('email', 'It is not a valid email').isEmail(),
  check('password', 'Password should be more than 6 characters').isLength({ min:6 }),
  validateFields
], login)




module.exports = router;