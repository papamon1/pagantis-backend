const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/controller.user');

router.post('/', userCtrl.doLogin);
router.get('/', userCtrl.listUsers);

module.exports = router;