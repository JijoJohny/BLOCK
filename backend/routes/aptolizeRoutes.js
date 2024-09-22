// routes/aptolizeRoutes.js

const express = require('express');
const { depositTokens, withdrawTokens, getBalance } = require('../controllers/aptolizeController');
const router = express.Router();

// Route to deposit tokens
router.post('/deposit', depositTokens);

// Route to withdraw tokens
router.post('/withdraw', withdrawTokens);

// Route to get token balance
//router.get('/balance', getBalance);

module.exports = router;
