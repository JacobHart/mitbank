const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth');

const User = require('../../models/User')

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
    '/', 
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        
        try {
            let user = await User.findOne({ email });

            if(user) {
                return res.status(400).json({ errors: [ {msg: 'User already exists'}]});
            }

            user = new User({
                name,
                email,
                password
            })

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                { expiresIn: 3600000 },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                });

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
        
});


// @route   PUT api/users/transaction
// @desc    Add transaction to user
// @access  Private
router.put('/transaction', [ auth, [
    check('value', 'Value is required').not().isEmpty(),
    check('value', 'Value should be a decimal').isDecimal()
] ], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const value = req.body.value;

    try {
        const user = await User.findOne({ id: req.user.id }).select('-password');
        user.transaction.unshift({'value': value}); 
        user.balance += Number(value); 
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/withdraw', [ auth, [
    check('value', 'Value is required').not().isEmpty(),
    check('value', 'Value should be a decimal').isDecimal()
] ], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const value = req.body.value * -1;

    try {
        const user = await User.findOne({ id: req.user.id }).select('-password');
        user.transaction.unshift({'value': value}); 
        user.balance += Number(value); 
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;