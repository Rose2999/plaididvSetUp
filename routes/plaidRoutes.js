const express = require('express');
const router = express.Router();
const { createLinkToken } = require('../controllers/plaidController');

router.get('/link/token/create', createLinkToken);

module.exports = router;
