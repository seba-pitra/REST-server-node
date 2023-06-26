const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, postUsers, putUsers, deleteUsers } = require('../controllers/users.controller');

const { isValidRol, emailAlreadyExists, userAlreadyExistsWithId } = require('../helpers/db.validators');

const { validateFields, validateJWT, isAdminRole, hasRole } = require('../middlewares');

const router = Router();

router.get('/', getUsers);



router.put('/:id', [
  check('id', `id is not a valid ID`).isMongoId(),
  check('id', `id is not a valid ID`).custom(userAlreadyExistsWithId),
  check('rol').custom(isValidRol),
  validateFields
], putUsers);



router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password should be more than 6 characters').isLength({ min:6 }),
  check('email', 'Email is not valid').custom(emailAlreadyExists),
  check('rol').custom(isValidRol),
  
  validateFields
], postUsers);



router.delete('/:id', [
  validateJWT,
  // isAdminRole,
  hasRole('USER_ROLE'),
  check('id', `id is not a valid ID`).isMongoId(),
  check('id', `id is not a valid ID`).custom(userAlreadyExistsWithId),
  validateFields
], deleteUsers);




module.exports = router;