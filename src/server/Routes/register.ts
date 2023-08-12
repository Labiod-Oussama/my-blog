const { Router } = require('express')
const RegisterController = require('../Controlleurs/registerControlleur')
import authUser from '../Middlewares/authUser';
import checkUserExist from '../Middlewares/checkUserExist';
import isAdmin from '../Middlewares/isAdmin';
const router = Router();

router.post('/signup', RegisterController.signup);
router.post('/login', checkUserExist, RegisterController.login);
router.get('/logout', RegisterController.logout);
router.get('/Dashboad', authUser, isAdmin);
module.exports = router;