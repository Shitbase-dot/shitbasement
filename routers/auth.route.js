

const {Router} = require('express');
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/register', [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Minimal length of password 6 signs').isLength(6)
],  async (req, res) => {
    
    try {
        
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Uncorrect entering data'
            });
        }

        const {email, password} = req.body;
        const cantidate = await User.findOne({email});
        if(cantidate) {
            return res.status(404).json({message: 'User had created'});
        }

        const hashedPassword = await bcrypt.hash(password, 4);
        const user = new User({email, password: hashedPassword});

        await user.save();

        res.status(201).json({message: 'User have created'});
        
    } catch (e) {
        res.status(500).json({message: 'Something going wrong, will try later'});
    }
});

router.post('/login',
[
    check('email', 'Enter a correct email').normalizeEmail().isEmail(),
    check('password', 'Enter a password').exists()
],
async (req, res) => {
    
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Uncorrect entering data'
            });
        }

        const {email, password} = req.body;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message: 'User had not found'});
        }

        const isMuch = await bcrypt.compare(password, user.password);
        
        if (!isMuch) {
            return res.status(400).json({message: 'Password was not found'});
        }
           
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        );

        res.json({token, userId: user.id});

        
    } catch (e) {
        res.status(500).json({message: 'Something going wrong, will try later'});
    }
});

module.exports = router;