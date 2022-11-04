const express = require('express');

const etherscanServices = require('../services/etherscan.js');

const router = express.Router();

router.get('/', async (req, res) => {
  const { a, page = 1, pageSize = 50 } = req.query;

  try {
    const transactions = await etherscanServices.getTransactionsByAddress(a, +page, +pageSize);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
