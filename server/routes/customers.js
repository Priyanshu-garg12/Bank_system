const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Customer = require('../models/customer');

// @route   POST api/customers
// @desc    Add a new customer
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('balance', 'Please enter initial balance').isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, balance } = req.body;

    try {
      // Check if customer with this email already exists
      let customer = await Customer.findOne({ email });

      if (customer) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Customer already exists' }] });
      }

      customer = new Customer({
        name,
        email,
        balance
      });

      await customer.save();
      res.json(customer);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
