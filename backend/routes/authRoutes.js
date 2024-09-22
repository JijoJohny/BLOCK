const express = require('express');
const { authenticateUser,storeNonce } = require('../controllers/authController');
const router = express.Router();

router.post('/store-nonce', storeNonce);
router.post('/auth', authenticateUser);

module.exports = router;
