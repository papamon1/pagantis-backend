const express = require('express');
const router = express.Router();

const walletCtrl = require('../controllers/controller.wallet');

router.get('/owner/:id', walletCtrl.getWalletsById);

module.exports = router;