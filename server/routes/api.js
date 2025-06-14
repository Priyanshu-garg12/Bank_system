const express = require("express");
const User = require("../models/model");
const Transaction = require("../models/transaction");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("node api running");
});

// Get all users/customers
router.get("/allUsers", async (req, res) => {
  let user;
  try {
    user = await User.find();
    res.send(user);
  } catch (e) {
    console.error(e);
    res.send("Server Error");
  }
});

// Get user by account number
router.get("/user/:acc_no", async (req, res) => {
  let user;
  try {
    user = await User.findOne({ acc_no: req.params.acc_no });
    res.send(user);
  } catch (e) {
    console.error(e);
    res.send("Server Error");
  }
});

// Get transaction history
router.get("/history", async(req,res) => {
  let history;
  try{
    history = await Transaction.find().populate('From', ['name']).populate('To', ['name']);
    res.send(history);
  } catch (e){
    console.error(e)
    res.send("Server Error")
  }
})

// Add new customer
router.post("/users", [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('acc_balance', 'Please enter initial balance').isNumeric(),
], async (req, res) => {
  console.log('Received request to add customer:', req.body);
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, acc_balance, acc_no, profession } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    console.log('Existing user check:', user ? 'User exists' : 'New user');

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Create new user
    user = new User({
      name,
      email,
      acc_balance: parseFloat(acc_balance),
      acc_no: acc_no || String(Math.floor(Math.random() * 9000000000) + 1000000000),
      profession: profession || 'NA'
    });

    console.log('Attempting to save user:', user);
    await user.save();
    console.log('User saved successfully');
    res.json(user);
  } catch (err) {
    console.error('Server error while adding user:', err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  "/add",
  [
    check("name", "Name field required!").not().isEmpty(),
    check("acc_no", "Account no. field required!").not().isEmpty(),
    check("email", "Email field required!").not().isEmpty(),
    check("acc_balance", "Account balance required!").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const { name, acc_no, email, profession, acc_balance } = req.body;
    try {
      let user = await User.findOne({ acc_no });
      if (user) {
        res.json("Account already exists!");
      } else {
        user = new User({ name, acc_no, email, profession, acc_balance });
        await user.save();
        res.send("User created :)");
      }
    } catch (e) {
      console.error(e.message);
      res.send("server error!");
    }
  }
);

router.post("/transaction", [
  check("amount", "Enter amount for transfer").not().isEmpty(),
  check("From", "Enter account number").not().isEmpty(),
  check("To", "Enter account number").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const { amount, From, To } = req.body;
    try{
      let from_user = await User.findOne({ acc_no: From })
      let to_user = await User.findOne({ acc_no: To })
      if (!from_user || !to_user){
        res.send("User does not exist :( ")
      }
      else {
        if (amount > from_user.acc_balance){
          res.send("Amount exceeds the account balance")
        }
        else{
          from_user.acc_balance = from_user.acc_balance - amount
          to_user.acc_balance = to_user.acc_balance + +amount
          await from_user.save()
          await to_user.save()
          let transaction = new Transaction({ From:from_user._id, To:to_user._id, amount })
          await transaction.save()
          res.send("Transaction successful")
        }
      }
    } catch(e){
      console.error(e)
      res.send("Server Error!")
    }
  })
module.exports = router;
