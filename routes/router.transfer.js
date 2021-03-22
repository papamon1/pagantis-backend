const express = require('express');
const router = express.Router();

const TransferCtrl = require('../controllers/controller.transfer');

router.get('/transferFrom/:id', TransferCtrl.getTransferByWalletId);
router.post('/', TransferCtrl.createTransfer);

module.exports = router;