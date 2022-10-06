const express = require('express');
const router = express.Router();

// @route   GET api/transactions
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Transactions route'));

module.exports = router;